import { Database } from '@/types/supabase'
import {
  Alert,
  Button,
  Divider,
  List,
  Loader,
  Paper,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useFullscreen } from '@mantine/hooks'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconCircleCheck } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const instructions: string[] = [
  'Your are under a strict sandbox environment. You will not be able to access any other application or window during the test.',
  'Do not refresh the page or close the browser window. This will automatically submit your test. If you need to leave the page, click on the "Resume Test" button to continue.',
  'The test will be automatically submitted after the time limit expires. Please check the duration of the test before starting.',
  'Make sure you have a stable internet connection before starting the test. If you lose internet connection during the test, you will not be able to resume it.',
  'Tab switching is not allowed during the test. If you switch tabs more than three times, your test will be automatically submitted.',
  'Escaping full-screen mode is not allowed during the test. If you escape full-screen mode, your test will be automatically submitted.',
  'If you are found to be cheating, your test will be automatically submitted.',
  'Make sure to use the latest version of Google Chrome browser or Microsoft Edge browser.',
]

export default function TestValidation() {
  const router = useRouter()
  const theme = useMantineTheme()
  const { fullscreen, toggle } = useFullscreen()
  const supabaseClient = useSupabaseClient<Database>()
  const user = useSession()
  const { moduleId } = router.query

  useEffect(() => {
    supabaseClient
      .from('profile_completed_module')
      .select('*')
      .eq('module_id', moduleId)
      .eq('user_id', user?.user?.id)
      .then(({ data, error }) => {
        if (error) {
          console.log(error)
          return
        }

        if (data[0].is_submitted === true) {
          router.push(`/courses`)
        }
      })

    setTimeout(() => {
      if (fullscreen) {
        router.push(`/courses/module-test/${moduleId}`)
      }
    }, 25000)
  }, [fullscreen, moduleId, router, supabaseClient, user])

  return (
    <>
      {fullscreen ? (
        <div className="flex min-h-screen p-10 bg-gray-50">
          <div className="border flex rounded-md bg-white">
            <div className="px-6 space-y-8 m-auto h-full w-full pt-6">
              <Title order={2} fw={600} color={theme.colors.gray[7]}>
                Instructions
              </Title>
              <List
                spacing="lg"
                size="md"
                center
                icon={
                  <ThemeIcon color="red" size={24} variant="light" radius="xl">
                    <IconCircleCheck size={18} />
                  </ThemeIcon>
                }
              >
                {instructions.map((instruction, index) => (
                  <List.Item
                    key={index}
                    sx={{
                      lineHeight: '1.3rem',
                      letterSpacing: '0.02rem',
                    }}
                  >
                    <span className="text-gray-600"> {instruction}</span>
                  </List.Item>
                ))}
              </List>
            </div>
            <Divider orientation="vertical" color={theme.colors.gray[2]} />
            <div className="w-full flex items-center justify-between p-4 flex-col space-y-10">
              <div></div>
              <Loader variant="oval" size={'xl'} />
              <Alert color="red">
                <Text color="red" className="max-w-md mx-auto text-center">
                  Please don&apos;t minimize the window. you will be
                  automatically redirected to the test after verification is
                  complete.
                </Text>
              </Alert>
              <div className="flex justify-end w-full">
                <Button
                  fw={400}
                  variant="light"
                  size="xs"
                  onClick={() => router.push(`/courses`)}
                >
                  Resume Test
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-gray-50 min-h-screen">
          <Paper withBorder shadow="md" p={'xl'} className="space-y-8">
            <Title order={3} fw={600} color={theme.colors.gray[7]}>
              Please Enable Full Screen Mode to Continue
            </Title>
            <div className="space-x-6 w-full flex justify-end">
              <Button fw={400} onClick={toggle}>
                Enable Full Screen
              </Button>
              <Button
                fw={400}
                variant="light"
                onClick={() => router.push(`/courses`)}
              >
                Resume Test
              </Button>
            </div>
          </Paper>
        </div>
      )}
    </>
  )
}

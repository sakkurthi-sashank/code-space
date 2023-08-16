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
  'You are in a strictly controlled test environment. You must not access any other applications or windows during the test.',
  'The test will automatically submit upon reaching the time limit. Verify the test duration before starting.',
  'Ensure a stable internet connection before beginning the test. Losing internet connection will prevent resuming the test.',
  'Tab switching is prohibited during the test. Switching tabs more than three times will lead to automatic test submission.',
  'Exiting full-screen mode is not allowed. Doing so will result in the automatic submission of your test.',
  'Any attempts at cheating will trigger automatic test submission.',
  'Use the latest versions of Google Chrome or Microsoft Edge browsers for optimal performance.',
  'Do not refresh the page or close the browser window while taking the test.',
  'If the test window is minimized or loses focus, it may lead to unintended consequences, including test submission.',
  'Follow all instructions carefully to ensure a fair and accurate assessment of your skills and knowledge.',
]

export default function TestValidation() {
  const router = useRouter()
  const theme = useMantineTheme()
  const { fullscreen, toggle } = useFullscreen()
  const supabaseClient = useSupabaseClient<Database>()
  const user = useSession()
  const { moduleId } = router.query

  useEffect(() => {
    if (!moduleId) return

    async function checkAndRedirect() {
      const { data, error } = await supabaseClient
        .from('profile_submitted_module')
        .select('*')
        .eq('module_id', moduleId)
        .eq('profile_id', user?.user?.id)

      if (error) {
        return
      }

      if (
        data[0]?.is_submitted === true ||
        data[0]?.is_submitted === undefined
      ) {
        router.push(`/courses`)
      }
    }

    const fullscreenRedirectTimeout = setTimeout(() => {
      if (fullscreen) {
        router.push(`/courses/modules/module-test/${moduleId}`)
      }
    }, 10000)

    checkAndRedirect()

    return () => clearTimeout(fullscreenRedirectTimeout)
  }, [fullscreen, moduleId, router, supabaseClient, user])

  return (
    <>
      {fullscreen ? (
        <div className="flex min-h-screen p-10 bg-gray-50 w-full">
          <div className="border flex rounded-md bg-white w-full">
            <div className="px-10 space-y-8 m-auto h-full w-full pt-6">
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
                    sx={{ lineHeight: '1.3rem', letterSpacing: '0.02rem' }}
                  >
                    <span className="text-gray-600"> {instruction}</span>
                  </List.Item>
                ))}
              </List>
            </div>
            <Divider orientation="vertical" color={theme.colors.gray[2]} />
            <div className="w-full flex items-center justify-between p-4 flex-col space-y-10">
              <div></div>
              <Loader variant="oval" size={60} />
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
        <div className="flex items-center justify-center bg-gray-50 min-h-screen w-full">
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

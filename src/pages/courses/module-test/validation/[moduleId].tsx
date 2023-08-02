import {
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
import { IconCircleCheck } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

interface TestValidationProps {
  moduleId: string
}

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

export default function TestValidation({ moduleId }: TestValidationProps) {
  const router = useRouter()
  const theme = useMantineTheme()
  const videoRef = useRef<HTMLVideoElement>(null)
  const { fullscreen, toggle } = useFullscreen()

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 384 } })
      .then((stream) => {
        let video = videoRef.current
        if (video) {
          video.srcObject = stream
          video.play()
        }
      })
      .catch((err) => {
        console.error('error:', err)
      })
  }

  useEffect(() => {
    getVideo()

    if (fullscreen) {
      setTimeout(() => {
        router.push(`/courses/module-test/${moduleId}`)
      }, 25000)
    }
  }, [fullscreen])

  return (
    <>
      {fullscreen ? (
        <div className="flex min-h-screen p-4">
          <div className="px-6 space-y-8 m-auto h-full w-full mt-20">
            <Title order={2} fw={600} color={theme.colors.gray[7]}>
              Instructions
            </Title>
            <List
              spacing="lg"
              size="sm"
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
                  {instruction}
                </List.Item>
              ))}
            </List>
          </div>
          <Divider orientation="vertical" color={theme.colors.gray[2]} />
          <div className="w-full flex items-center justify-center flex-col space-y-10">
            <video
              ref={videoRef}
              className="rounded-lg overflow-hidden shadow-lg"
            />
            <Loader variant="dots" size={'xl'} />
            <div className="ml-4 max-w-xl">
              <Text size="lg" color={'red'} align="center">
                Please wait a moment while we ensure your security. Your
                identity is being verified to ensure a safe testing environment.
                Rest assured, this process will be completed quickly, and you'll
                be ready to begin your test shortly.
              </Text>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Paper withBorder shadow="md" p={'xl'} className="space-y-4">
            <Text>Please Enable Full Screen Mode to continue the test.</Text>
            <div className="space-x-5 w-full flex justify-end">
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

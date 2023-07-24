import { List, ThemeIcon, Title, useMantineTheme } from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react'
import { useRouter } from 'next/router'

const instructions = [
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

  const { moduleId } = router.query

  return (
    <div className="px-6 space-y-8 m-auto max-w-2xl mt-20">
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
  )
}

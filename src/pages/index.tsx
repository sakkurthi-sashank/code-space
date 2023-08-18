import { Loader, Title, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const theme = useMantineTheme()

  useEffect(() => {
    setTimeout(() => {
      router.push('/courses')
    }, 1000)
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen flex-col space-y-8">
      <Title
        color={theme.colors.indigo[7]}
        order={2}
        mb={6}
        ff="Monaco"
        style={{ cursor: 'pointer' }}
      >
        codespace
      </Title>
      <Loader size={'md'} variant="dots" />
    </div>
  )
}

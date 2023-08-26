import { Box, Loader, Title, useMantineTheme } from '@mantine/core'
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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <Title
        color={theme.colors.indigo[7]}
        order={2}
        mb={6}
        ff="Monaco"
        style={{ cursor: 'pointer' }}
      >
        codespace
      </Title>
      <Loader size={'md'} variant="bars" />
    </Box>
  )
}

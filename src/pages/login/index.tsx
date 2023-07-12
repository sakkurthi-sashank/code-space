import { GoogleIcon } from '@/components/Icons/GoogleIcon'
import { supabase } from '@/libs/supabase'
import { Button, Paper, Text, Title, useMantineTheme } from '@mantine/core'
import Image from 'next/image'
import { useState } from 'react'

export default function LoginPage() {
  const theme = useMantineTheme()
  const [error, setError] = useState<string | null>(null)

  const handleLoginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${window.location.origin}/courses`,
      },
    })
    if (error) {
      setError(error.message)
    }
  }

  return (
    <div className="h-screen p-4 flex items-center bg-gray-50 justify-center">
      <Paper
        shadow="md"
        radius="md"
        withBorder
        className="max-w-md p-10 w-full flex-col flex items-center justify-center"
      >
        <Image
          src="/images/brand-logo.svg"
          alt="logo"
          width={40}
          height={40}
          className="my-6"
        />

        <Title order={2} mt={10} mb={30} color={theme.colors.gray[7]}>
          Sign In to your account
        </Title>

        <Button
          radius={'md'}
          leftIcon={<GoogleIcon />}
          variant="default"
          color="gray"
          fullWidth
          fw={500}
          onClick={handleLoginWithGoogle}
        >
          Sign in with Google
        </Button>

        {error && (
          <Text mt={10} color="red" size="sm">
            {error}
          </Text>
        )}

        <Text align="center" mt={30} size={'xs'} color="gray">
          By continuing, you are indicating that you accept our Terms of Service
          and Privacy Policy.
        </Text>
      </Paper>
    </div>
  )
}

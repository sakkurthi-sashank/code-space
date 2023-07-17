import { supabase } from '@/libs/supabase'
import {
  Anchor,
  Button,
  Divider,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function LoginPage() {
  const theme = useMantineTheme()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [magicLinkEmail, setMagicLinkEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [magicLinkError, setMagicLinkError] = useState('')

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
    setEmailError('')
  }

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value)
  }

  const onChangeMagicLinkEmail = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMagicLinkEmail(event.currentTarget.value)
    setMagicLinkError('')
  }

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setEmailError('Please check your email and password.')
      return
    }

    if (data.user) {
      router.push('/courses')
    }
  }

  const handleMagicLinkSignIn = async () => {
    if (magicLinkEmail === '') {
      setMagicLinkError('Please enter your email address.')
      return
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: magicLinkEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/courses`,
        shouldCreateUser: false,
      },
    })

    if (error) {
      setMagicLinkError(error.message)
      return
    }

    notifications.show({
      color: 'indigo',
      withCloseButton: true,
      autoClose: 10000,
      title: 'Check your email',
      message: `We've sent a magic link to ${magicLinkEmail}. Click the link to sign in.`,
    })
  }

  return (
    <div className="h-screen p-3 flex items-center bg-gray-50 justify-center">
      <Paper
        shadow="md"
        radius="md"
        withBorder
        className="max-w-md sm:px-10 p-5 py-10 w-full flex-col flex justify-center"
      >
        <Title color={theme.colors.indigo[7]} order={2} mb={6} ff="Monaco">
          codespace
        </Title>

        <Title order={3} mb={40} align="left" color={theme.colors.gray[7]}>
          Sign In to your account
        </Title>

        <TextInput
          placeholder="Email Address"
          onChange={onChangeEmail}
          value={email}
          className="mb-4 w-full"
          error={emailError}
        />

        <PasswordInput
          placeholder="Password"
          onChange={onChangePassword}
          value={password}
          className="mb-4 w-full"
        />

        <Anchor
          className="mb-3 w-full"
          align="right"
          component="button"
          size={'sm'}
          color={'indigo'}
          onClick={() =>
            notifications.show({
              color: 'red',
              withCloseButton: true,
              autoClose: 10000,
              title: 'Reset Your Password',
              message:
                'login using your email address below and reset your password after login.',
            })
          }
        >
          Forgot your password?
        </Anchor>

        <Button fw={500} onClick={handleLogin}>
          Sign In
        </Button>

        <Divider my={20} label="OR" labelPosition="center" />

        <TextInput
          placeholder="Email Address"
          onChange={onChangeMagicLinkEmail}
          value={magicLinkEmail}
          className="mb-4 w-full"
          error={magicLinkError}
        />

        <Button
          variant="outline"
          color="indigo"
          fw={500}
          className="mb-4 w-full"
          onClick={handleMagicLinkSignIn}
        >
          Continue with email
        </Button>

        <Text align="center" mt={30} size="xs" color="gray">
          By continuing, you are indicating that you accept our Terms of Service
          and Privacy Policy.
        </Text>
      </Paper>
    </div>
  )
}

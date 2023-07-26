import { supabase } from '@/libs/supabase'
import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { getHotkeyHandler } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useReducer } from 'react'

type State = {
  email: string
  password: string
  emailError: string
  loading: boolean
}

export default function LoginPage() {
  const theme = useMantineTheme()
  const router = useRouter()

  const [event, updateEvent] = useReducer(
    (prev: State, next: Partial<State>): State => {
      return { ...prev, ...next }
    },
    {
      email: '',
      password: '',
      emailError: '',
      loading: false,
    },
  )

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateEvent({ email: event.currentTarget.value, emailError: '' })
  }

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateEvent({ password: event.currentTarget.value })
  }

  const handleUserLogin = async () => {
    updateEvent({ loading: true })

    const { data, error } = await supabase.auth.signInWithPassword({
      email: event.email,
      password: event.password,
    })

    if (error) {
      updateEvent({ emailError: 'Please check your email and password.' })
      updateEvent({ loading: false })
      return
    }

    if (data.user) {
      updateEvent({ loading: false })
      router.push('/courses')
      return
    }
  }

  const handleForgotPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(event.email)

    if (error) {
      updateEvent({ emailError: error.message })
      return
    }

    notifications.show({
      color: 'indigo',
      withCloseButton: true,
      autoClose: 10000,
      title: 'Password Recovery Email Sent',
      message:
        'Please check your email for a link to reset your password. If it does not appear within a few minutes, check your spam folder.',
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
          className="mb-4 w-full"
          error={event.emailError}
        />

        <PasswordInput
          placeholder="Password"
          onChange={onChangePassword}
          className="mb-4 w-full"
          onKeyDown={getHotkeyHandler([['enter', () => handleUserLogin()]])}
        />

        <Anchor
          className="mb-3 w-full"
          align="right"
          component="button"
          size={'sm'}
          color={'indigo'}
          onClick={() =>
            event.email
              ? handleForgotPassword()
              : updateEvent({ emailError: 'Please enter your email.' })
          }
        >
          Forgot your password?
        </Anchor>

        <Button fw={500} onClick={handleUserLogin} loading={event.loading}>
          Sign In
        </Button>

        <Text align="center" mt={30} size="xs" color="gray">
          Don&apos;t have an account?{' '}
          <Anchor
            component="a"
            color="blue"
            onClick={() => router.push('/auth/signup')}
          >
            signup
          </Anchor>
        </Text>

        <Text align="center" mt={30} size="xs" color="gray">
          By continuing, you are indicating that you accept our Terms of Service
          and Privacy Policy.
        </Text>
      </Paper>
    </div>
  )
}

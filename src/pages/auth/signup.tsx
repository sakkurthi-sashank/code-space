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
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useReducer } from 'react'

type State = {
  email: string
  password: string
  emailError: string
  loading: boolean
}

export default function SignUpPage() {
  const theme = useMantineTheme()
  const router = useRouter()
  const supabaseClient = useSupabaseClient()

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

  const handleUserSignUp = async () => {
    updateEvent({ loading: true })

    const { data, error } = await supabaseClient.auth.signUp({
      email: event.email,
      password: event.password,
    })

    if (error) {
      updateEvent({ emailError: 'Please check your email and password.' })
      updateEvent({ loading: false })
      return
    }

    if (data.user) {
      router.push('/auth/verify')
      updateEvent({ loading: false })
    }
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
          Create your account
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
          onKeyDown={getHotkeyHandler([['enter', () => handleUserSignUp()]])}
        />

        <Button fw={500} onClick={handleUserSignUp} loading={event.loading}>
          Sign Up
        </Button>

        <Text align="center" mt={30} size="xs" color="gray">
          Already have an account?{' '}
          <Anchor
            component="a"
            color="blue"
            onClick={() => router.push('/auth/login')}
          >
            Login
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

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
import { notifications } from '@mantine/notifications'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
  const theme = useMantineTheme()
  const router = useRouter()
  const supabaseClient = useSupabaseClient()
  const [loading, setLoading] = useState(false)

  const {
    register,
    reset,
    formState: { errors },
    setError,
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleUserLogin(values: { email: string; password: string }) {
    setLoading(true)

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    if (error) {
      setLoading(false)
      setError('email', { message: 'Invalid email or password' })
      return
    }

    if (data) {
      setLoading(false)
      reset()
      router.push('/')
    }
  }

  async function handleForgotPassword() {
    if (!getValues('email')) {
      setError('email', { message: 'Please enter your email address' })
      return
    }

    const { error } = await supabaseClient.auth.resetPasswordForEmail(
      getValues('email'),
    )

    if (error) {
      setError('email', { message: error.message })
      return
    }

    notifications.show({
      color: 'indigo',
      withCloseButton: true,
      autoClose: 10000,
      title: 'Password Reset',
      message:
        'If your email address is registered with us, you will receive a password reset link shortly. Please check your inbox and spam folder.',
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

        <Title order={3} mb={30} align="left" color={theme.colors.gray[7]}>
          Sign In to your account
        </Title>

        <form onSubmit={handleSubmit(handleUserLogin)} className="w-full">
          <TextInput
            placeholder="Email Address"
            className="mb-4 w-full"
            radius={'md'}
            error={errors.email?.message}
            {...register('email')}
          />

          <PasswordInput
            placeholder="Password"
            radius={'md'}
            {...register('password')}
            className="mb-4 w-full"
          />

          <Anchor
            className="mb-3 w-full"
            align="right"
            component="button"
            size={'sm'}
            color={'indigo'}
            onClick={handleForgotPassword}
          >
            Forgot your password?
          </Anchor>

          <Button fw={500} loading={loading} type="submit" fullWidth>
            Sign In
          </Button>
        </form>

        <Text align="center" mt={30} size="xs" color="gray">
          Don&apos;t have an account?{' '}
          <Anchor
            component="a"
            color="indigo"
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

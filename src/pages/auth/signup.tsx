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
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function SignUpPage() {
  const theme = useMantineTheme()
  const router = useRouter()
  const supabaseClient = useSupabaseClient()
  const [loading, setLoading] = useState(false)

  const {
    register,
    reset,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleUserSignUp = async (values: {
    email: string
    password: string
  }) => {
    setLoading(true)

    console.log(values)

    const { data, error } = await supabaseClient.auth.signUp({
      email: values.email,
      password: values.password,
    })

    if (error) {
      setLoading(false)
      setError('email', { message: 'Invalid email or password' })
      return
    }

    if (data.user) {
      setLoading(false)
      reset()
      router.push('/auth/verify-email')
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

        <form onSubmit={handleSubmit(handleUserSignUp)} className="w-full">
          <TextInput
            placeholder="Email Address"
            className="mb-4 w-full"
            radius={'md'}
            error={errors.email?.message}
            {...register('email')}
          />

          <PasswordInput
            placeholder="Password"
            className="mb-4 w-full"
            radius={'md'}
            {...register('password')}
          />

          <Button
            fw={500}
            radius="md"
            type="submit"
            loading={loading}
            className="mb-4 w-full"
          >
            Sign Up
          </Button>
        </form>

        <Text align="center" mt={30} size="xs" color="gray">
          Already have an account?{' '}
          <Anchor
            component="a"
            color="indigo"
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

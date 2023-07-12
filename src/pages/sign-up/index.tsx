import { supabase } from '@/lib/supabase'
import {
  Anchor,
  Button,
  Flex,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

const SignUp = () => {
  const router = useRouter()
  const theme = useMantineTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({ email: '', password: '' })

  const validateEmail = (value: string) =>
    /^[\w.+-]+@srmap\.edu\.in$/.test(value)
      ? null
      : 'Email must be a valid SRM email'

  const validatePassword = (value: string) =>
    value.length >= 8 ? null : 'Password must be at least 8 characters long'

  const handleUserSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      setLoading(true)

      const emailError = validateEmail(email)
      const passwordError = validatePassword(password)

      if (emailError || passwordError) {
        setFormErrors({ email: emailError!, password: passwordError! })
        setLoading(false)
        return
      }

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

      if (error) {
        throw new Error(error.message)
      }

      if (data.user) {
        router.push('/sign-up/verify-email')
      }

      setLoading(false)
    } catch (error) {
      console.error('An error occurred during sign-up:', error)
      setLoading(false)
    }
  }

  return (
    <div className="h-screen p-4 flex items-center bg-gray-50 justify-center">
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        withBorder
        className="max-w-md w-full flex-col flex items-center justify-center"
      >
        <Image
          src="/images/brand-logo.svg"
          alt="logo"
          width={40}
          height={40}
          className="my-6"
        />

        <Title order={2} mt={10} mb={30} color={theme.colors.gray[7]}>
          Create an account
        </Title>

        <form onSubmit={handleUserSignUp} className="w-full">
          <Stack w={'100%'} mt={10} spacing={'sm'}>
            <TextInput
              placeholder="Enter your email"
              error={formErrors.email}
              name="email"
              onChange={(event) => setEmail(event.currentTarget.value)}
            />

            <PasswordInput
              placeholder="Enter your password"
              error={formErrors.password}
              name="password"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />

            <Anchor align="end" component="a" size="sm">
              Forgot password?
            </Anchor>

            <Button fw={500} loading={loading} type="submit" fullWidth>
              Sign Up
            </Button>
          </Stack>
        </form>

        <Flex align={'center'} mt={20} justify={'center'}>
          <Text size="sm" color="gray">
            Already have an account?
          </Text>
          <Anchor component="a" size="sm" color="blue" ml={5} href="/sign-in">
            Sign In
          </Anchor>
        </Flex>

        <Text align="center" mt={30} size={'xs'} color="gray">
          By continuing, you are indicating that you accept our Terms of Service
          and Privacy Policy.
        </Text>
      </Paper>
    </div>
  )
}

export default SignUp

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

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()
  const theme = useMantineTheme()

  const handleSignIn = async () => {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      setError(true)
      setLoading(false)
    }

    if (data.user) {
      router.push('/')
    }

    setLoading(false)
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
          Sign In to your account
        </Title>

        <Stack w={'100%'} mt={10} spacing={'lg'}>
          <TextInput
            placeholder="Enter your email"
            error={error ? 'Invalid email or password' : ''}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />

          <PasswordInput
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />

          <Anchor align="end" component="a" size="sm">
            Forgot password?
          </Anchor>

          <Button fw={500} loading={loading} onClick={handleSignIn} fullWidth>
            Sign In
          </Button>

          <Flex align={'center'} justify={'center'}>
            <Text size="sm" color="gray">
              Don't have an account?
            </Text>
            <Anchor component="a" size="sm" color="blue" ml={5} href="/sign-up">
              Sign Up
            </Anchor>
          </Flex>
        </Stack>

        <Text align="center" mt={30} size={'xs'} color="gray">
          By continuing, you are indicating that you accept our Terms of Service
          and Privacy Policy.
        </Text>
      </Paper>
    </div>
  )
}

export default SignIn

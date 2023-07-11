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
import { useForm } from '@mantine/form'
import Image from 'next/image'
import { useRouter } from 'next/router'

const SignUp = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      loading: false,
    },

    validate: {
      email: (value) =>
        /^[\w.+-]+@srmap\.edu\.in$/.test(value)
          ? null
          : 'Email must be a valid SRM email',
      password: (value) =>
        value.length <= 6
          ? 'Password must be at least 8 characters long'
          : null,
    },
  })

  const router = useRouter()
  const theme = useMantineTheme()

  const handleSignUp = async (event: any) => {
    event.preventDefault()
    form.setFieldValue('loading', true)

    const { data, error } = await supabase.auth.signUp({
      email: form.values.email,
      password: form.values.password,
    })

    if (error) {
      form.setFieldValue('loading', false)
      return
    }

    if (data.user) {
      router.push('/sign-up/verify-email')
    }

    form.setFieldValue('loading', false)
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

        <form onSubmit={handleSignUp} className="w-full">
          <Stack w={'100%'} mt={10} spacing={'sm'}>
            <TextInput
              placeholder="Enter your email"
              error={form.errors.email}
              {...form.getInputProps('email')}
            />

            <PasswordInput
              placeholder="Enter your password"
              error={form.errors.password}
              {...form.getInputProps('password')}
            />

            <Anchor align="end" component="a" size="sm">
              Forgot password?
            </Anchor>

            <Button
              fw={500}
              loading={form.values.loading}
              type="submit"
              fullWidth
            >
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

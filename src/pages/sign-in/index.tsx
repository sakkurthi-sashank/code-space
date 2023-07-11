import { GoogleIcon } from '@/components/SocialIcons/GoogleIcon'
import { supabase } from '@/lib/supabase'
import {
  Anchor,
  Button,
  Divider,
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

const SignIn = () => {
  const router = useRouter()
  const theme = useMantineTheme()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      loading: false,
    },
  })

  const handleSignIn = async () => {
    form.setFieldValue('loading', true)
    const { email, password } = form.values
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      form.setErrors({ email: error.message })
    }

    if (data.user) {
      router.push('/')
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
          Sign In to your account
        </Title>

        <Stack w={'100%'} mt={10} spacing={'lg'}>
          <TextInput
            placeholder="Enter your email"
            {...form.getInputProps('email')}
            error={form.errors.email}
          />

          <PasswordInput
            placeholder="Enter your password"
            {...form.getInputProps('password')}
          />

          <Anchor align="end" component="a" size="sm">
            Forgot password?
          </Anchor>

          <Button
            fw={500}
            loading={form.values.loading}
            onClick={handleSignIn}
            fullWidth
          >
            Sign In
          </Button>

          <Divider my={4} label="OR" labelPosition="center" />

          <Button fw={500} leftIcon={<GoogleIcon />} variant="default">
            Sign In with Google
          </Button>

          <Flex align={'center'} justify={'center'}>
            <Text size="sm" color="gray">
              Don&apos;t have an account?
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

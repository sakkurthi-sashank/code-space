import {
  Button,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { getHotkeyHandler } from '@mantine/hooks'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function ForgetPasswordPage() {
  const theme = useMantineTheme()
  const router = useRouter()
  const user = useSession()
  const supabaseClient = useSupabaseClient()

  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value)
  }

  const handleUserForgetPassword = async () => {
    const { data, error } = await supabaseClient.auth.updateUser({
      password: password,
    })

    if (error) {
      setError('Please check your password.')
      return
    }

    if (data.user) {
      router.push('/')
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
          Forget Password
        </Title>

        <TextInput
          placeholder="Email Address"
          disabled={true}
          defaultValue={user?.user?.email}
          className="mb-4 w-full"
        />

        <PasswordInput
          placeholder="Password"
          onChange={onChangePassword}
          error={error}
          className="mb-4 w-full"
          onKeyDown={getHotkeyHandler([
            ['enter', () => handleUserForgetPassword()],
          ])}
        />

        <Button fw={500} onClick={handleUserForgetPassword}>
          Reset Password
        </Button>
      </Paper>
    </div>
  )
}

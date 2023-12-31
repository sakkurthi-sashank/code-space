import { Database } from '@/types/supabase'
import { Button, Drawer, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { DrawerFormActionButtons } from '../common/DrawerFormActionButtons'

export const CreateUser = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  const supabaseClient = useSupabaseClient<Database>()

  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors },
  } = useForm<{
    email_address: string
  }>()

  async function handleCreateUser(values: { email_address: string }) {
    setLoading(true)

    const { data: existingUser } = await supabaseClient
      .from('profile')
      .select('id')
      .eq('email_address', values.email_address)
      .maybeSingle()

    if (existingUser) {
      setError('email_address', {
        message: 'Email address already exists',
      })
      setLoading(false)
      return
    }

    const { data, error } = await supabaseClient.auth.admin.createUser({
      email: values.email_address,
      password: values.email_address.split('@')[0],
      email_confirm: true,
    })

    if (error) {
      setError('email_address', {
        message: "Couldn't create user account with this email address",
      })
      setLoading(false)
      return
    }

    if (data.user) {
      queryClient.invalidateQueries('profiles')
      setLoading(false)
      reset()
      close()
    }

    !error && data && close()
  }

  return (
    <div>
      <Button
        onClick={open}
        variant="light"
        color="indigo"
        fw={500}
        size="xs"
        leftIcon={<IconPlus size={16} stroke={1.75} />}
      >
        Add Profile
      </Button>
      <Drawer
        opened={opened}
        position="right"
        size={'100%'}
        onClose={close}
        title="Add Profile"
      >
        <form className="space-y-1.5" onSubmit={handleSubmit(handleCreateUser)}>
          <TextInput
            description="Email Address"
            error={errors.email_address?.message}
            placeholder="Enter email address"
            size="sm"
            {...register('email_address')}
          />

          <DrawerFormActionButtons close={close} loading={loading} />
        </form>
      </Drawer>
    </div>
  )
}

import { Button, Modal, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'

export const CreateProfile = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  const supabaseClient = useSupabaseClient()

  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors },
  } = useForm<{
    email_address: string
  }>()

  async function handleCreateProfile(values: { email_address: string }) {
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
    <div className="flex justify-end items-center p-2">
      <Button
        onClick={open}
        variant="filled"
        color="indigo"
        size="xs"
        leftIcon={<IconPlus size={16} stroke={1.5} />}
      >
        Add Profile
      </Button>
      <Modal opened={opened} size={'xl'} onClose={close} title="Add Profile">
        <form
          className="space-y-1.5 p-3"
          onSubmit={handleSubmit(handleCreateProfile)}
        >
          <TextInput
            label="Email Address"
            error={errors.email_address?.message}
            placeholder="Enter email address"
            required
            {...register('email_address')}
          />

          <div className="flex justify-end pt-5">
            <Button
              type="submit"
              loading={loading}
              size="xs"
              fw={500}
              variant="filled"
            >
              Create Profile
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

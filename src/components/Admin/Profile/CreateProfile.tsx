import { Button, Modal, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useQueryClient } from 'react-query'

export const CreateProfile = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [emailAddress, setEmailAddress] = useState('')
  const [error, setError] = useState('')

  const queryClient = useQueryClient()

  const supabaseClient = useSupabaseClient()

  const handleCreateProfile = async () => {
    if (!emailAddress) {
      setError('Email address is required')
      return
    }

    const { data: existingUser } = await supabaseClient
      .from('profile')
      .select('id')
      .eq('email_address', emailAddress)
      .maybeSingle()

    if (existingUser) {
      setError('User already exists with this email address')
      return
    }

    const { data, error } = await supabaseClient.auth.admin.createUser({
      email: emailAddress,
      password: emailAddress.split('@')[0],
      email_confirm: true,
    })

    queryClient.invalidateQueries('profiles')

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
        <div className="p-4">
          <TextInput
            label="Email Address"
            error={error}
            placeholder="Enter email address"
            required
            variant="default"
            className="mb-4"
            onChange={(e) => {
              setError('')
              setEmailAddress(e.currentTarget.value)
            }}
          />

          <div className="flex justify-end mt-5">
            <Button
              size="xs"
              fw={500}
              variant="filled"
              onClick={handleCreateProfile}
            >
              Create Profile
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

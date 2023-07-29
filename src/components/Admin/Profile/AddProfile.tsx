import { supabase } from '@/libs/supabase'
import { Button, Modal, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'

export const AddProfile = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [emailAddress, setEmailAddress] = useState('')
  const [error, setError] = useState('')

  const handleCreateProfile = async () => {
    const { data, error } = await supabase.auth.admin.createUser({
      email: emailAddress,
      password: emailAddress.split('@')[0],
      email_confirm: true,
    })

    if (error) {
      setError(error.message)
      return
    }

    await supabase
      .from('profile')
      .insert([
        {
          id: data.user?.id!,
          email_address: emailAddress,
        },
      ])
      .then(() => {
        close()
      })
  }

  return (
    <div className="flex justify-end items-center p-2">
      <Button size="xs" fw={500} variant="outline" onClick={open}>
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
            onChange={(e) => setEmailAddress(e.currentTarget.value)}
          />

          <div className="flex justify-end">
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

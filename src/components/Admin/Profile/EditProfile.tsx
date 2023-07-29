import { Profile } from '@/types/types'
import {
  ActionIcon,
  Button,
  Modal,
  Stack,
  Switch,
  TextInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconEdit } from '@tabler/icons-react'
import { useState } from 'react'
import { useQueryClient } from 'react-query'

export function EditProfile({
  id,
  admission_number,
  display_name,
  email_address,
  phone_number,
  branch,
  batch,
  section,
  is_admin,
}: Profile) {
  const [opened, { open, close }] = useDisclosure(false)
  const queryClient = useQueryClient()

  const handleChange = (key: string, value: string) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      [key]: value,
    }))
  }

  const supabaseClient = useSupabaseClient()

  const [event, setEvent] = useState({
    admission_number,
    display_name,
    email_address,
    phone_number,
    branch,
    batch,
    section,
    is_admin,
  })

  const handleSubmit = async () => {
    const { error } = await supabaseClient
      .from('profile')
      .update(event)
      .eq('id', id)

    queryClient.invalidateQueries('profiles')

    !error && close()
  }

  return (
    <>
      <ActionIcon onClick={open} color="gray">
        <IconEdit size={18} stroke={1.5} />
      </ActionIcon>
      <Modal title="Update Profile" opened={opened} size={'xl'} onClose={close}>
        <Stack spacing="md" p={'md'}>
          <TextInput
            placeholder="Admission Number"
            value={event.admission_number || ''}
            onChange={(event) =>
              handleChange('admission_number', event.currentTarget.value)
            }
          />

          <TextInput
            placeholder="Display Name"
            value={event.display_name || ''}
            onChange={(event) =>
              handleChange('display_name', event.currentTarget.value)
            }
          />

          <TextInput
            placeholder="Email Address"
            value={event.email_address}
            disabled
            onChange={(event) =>
              handleChange('email_address', event.currentTarget.value)
            }
          />

          <Switch
            label="Is Admin"
            checked={event.is_admin === true ? true : false}
            onChange={(event) =>
              handleChange(
                'is_admin',
                event.currentTarget.checked ? 'true' : 'false',
              )
            }
          />

          <TextInput
            placeholder="Phone Number"
            value={event.phone_number || ''}
            onChange={(event) =>
              handleChange('phone_number', event.currentTarget.value)
            }
          />

          <TextInput
            placeholder="Branch"
            value={event.branch || ''}
            onChange={(event) =>
              handleChange('branch', event.currentTarget.value)
            }
          />

          <TextInput
            placeholder="Batch"
            value={event.batch || ''}
            onChange={(event) =>
              handleChange('batch', event.currentTarget.value)
            }
          />

          <TextInput
            placeholder="Section"
            value={event.section ? event.section : ''}
            onChange={(event) =>
              handleChange('section', event.currentTarget.value)
            }
          />

          <div className="flex justify-end">
            <Button variant="filled" size="xs" fw={500} onClick={handleSubmit}>
              Update
            </Button>
          </div>
        </Stack>
      </Modal>
    </>
  )
}

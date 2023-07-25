import { supabase } from '@/libs/supabase'
import { Profile } from '@/types/types'
import { ActionIcon, Button, Modal, Stack, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconEdit } from '@tabler/icons-react'
import { useState } from 'react'

export const UpdateProfile = ({
  id,
  admission_number,
  display_name,
  email_address,
  phone_number,
  branch,
  batch,
  section,
}: Profile) => {
  const [opened, { open, close }] = useDisclosure(false)

  const handleChange = (key: string, value: string) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      [key]: value,
    }))
  }

  const [event, setEvent] = useState({
    admission_number,
    display_name,
    email_address,
    phone_number,
    branch,
    batch,
    section,
  })

  const handleSubmit = async () => {
    const { error } = await supabase.from('profile').update(event).eq('id', id)
    if (error) return
    close()
  }

  return (
    <>
      <ActionIcon variant="light" color="gray" size={'md'} onClick={open}>
        <IconEdit size={'1.2rem'} stroke={1.5} />
      </ActionIcon>
      <Modal title="Update Profile" opened={opened} size={'xl'} onClose={close}>
        <Stack spacing="md" p={'md'}>
          <TextInput
            placeholder="Admission Number"
            value={event.admission_number!}
            onChange={(event) =>
              handleChange('admission_number', event.currentTarget.value)
            }
          />

          <TextInput
            placeholder="Display Name"
            value={event.display_name}
            onChange={(event) =>
              handleChange('display_name', event.currentTarget.value)
            }
          />

          <TextInput
            placeholder="Email Address"
            value={event.email_address}
            onChange={(event) =>
              handleChange('email_address', event.currentTarget.value)
            }
          />

          <TextInput
            placeholder="Phone Number"
            value={event.phone_number ? event.phone_number : ''}
            onChange={(event) =>
              handleChange('phone_number', event.currentTarget.value)
            }
          />

          <TextInput
            placeholder="Branch"
            value={event.branch ? event.branch : ''}
            onChange={(event) =>
              handleChange('branch', event.currentTarget.value)
            }
          />

          <TextInput
            placeholder="Batch"
            value={event.batch ? event.batch : ''}
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

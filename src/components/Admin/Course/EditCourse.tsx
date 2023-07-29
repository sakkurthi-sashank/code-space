import { Database } from '@/types/supabase'
import { Course } from '@/types/types'
import {
  ActionIcon,
  Button,
  Modal,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconEdit } from '@tabler/icons-react'
import { useReducer, useState } from 'react'

export function EditCourse(props: Course) {
  const [opened, { open, close }] = useDisclosure(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const supabaseClient = useSupabaseClient<Database>()

  const [event, updateEvent] = useReducer(
    (prev: Course, next: Partial<Course>) => {
      return { ...prev, ...next }
    },
    {
      ...props,
    },
  )

  const handleEditCourse = async () => {
    setError('')

    if (!event.course_name || !event.course_code) {
      setError('Course Name and Course Code are required.')
      return
    }

    setLoading(true)
    const { data, error } = await supabaseClient
      .from('course')
      .update(event)
      .eq('id', props.id)

    if (error) {
      setError('Something went wrong while updating the course.')
    }

    if (data) {
      close()
    }

    setLoading(false)
  }

  return (
    <>
      <ActionIcon onClick={open} color="gray">
        <IconEdit size={18} stroke={1.5} />
      </ActionIcon>
      <Modal opened={opened} size={'lg'} onClose={close} title={'Edit Course'}>
        <Stack spacing={8} p={'md'}>
          <TextInput
            label="Course Name"
            size="xs"
            placeholder="Course Name"
            value={event.course_name}
            onChange={(event) =>
              updateEvent({ course_name: event.currentTarget.value })
            }
          />

          <TextInput
            label="Course Code"
            size="xs"
            placeholder="Course Code"
            value={event.course_code}
            onChange={(event) =>
              updateEvent({ course_code: event.currentTarget.value })
            }
          />

          <Textarea
            label="Course Description"
            placeholder="Course Description"
            size="xs"
            autosize
            value={event.course_description}
            onChange={(event) =>
              updateEvent({ course_description: event.currentTarget.value })
            }
          />

          <TextInput
            label="Course Image"
            placeholder="Course Image"
            size="xs"
            value={event.course_image}
            onChange={(event) =>
              updateEvent({ course_image: event.currentTarget.value })
            }
          />

          <DateInput
            label="Start Date"
            required
            size="xs"
            placeholder="Start Date"
            value={new Date(event.start_date!)}
            onChange={(value) =>
              updateEvent({ start_date: value?.toISOString() })
            }
          />

          <DateInput
            label="End Date"
            placeholder="End Date"
            size="xs"
            value={new Date(event.end_date!)}
            onChange={(value) =>
              updateEvent({ end_date: value?.toISOString() })
            }
          />
        </Stack>

        {error && <div className="text-red-500">{error}</div>}

        <div className="flex justify-end">
          <Button onClick={close} fw={500} variant="light" size="xs">
            Cancel
          </Button>
          <Button
            size="xs"
            onClick={handleEditCourse}
            className="ml-2"
            loading={loading}
            fw={500}
          >
            Edit Course
          </Button>
        </div>
      </Modal>
    </>
  )
}

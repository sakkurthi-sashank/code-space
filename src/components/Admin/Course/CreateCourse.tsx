import { supabase } from '@/libs/supabase'
import { Course } from '@/types/types'
import { Button, Modal, Stack, TextInput, Textarea } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons-react'
import { useReducer, useState } from 'react'

export function AddCourse() {
  const [opened, { open, close }] = useDisclosure(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [event, updateEvent] = useReducer(
    (prev: Course, next: Partial<Course>) => {
      return { ...prev, ...next }
    },
    {
      course_name: '',
      course_code: '',
      course_description: '',
      course_image: '',
      start_date: '',
      end_date: '',
    },
  )

  const handleEditCourse = async () => {
    setError('')

    if (!event.course_name || !event.course_code) {
      setError('Course Name and Course Code are required.')
      return
    }

    setLoading(true)
    const { data, error } = await supabase.from('course').insert({
      course_name: event.course_name,
      course_code: event.course_code,
      course_description: event.course_description!,
      course_image: event.course_image!,
      start_date: event.start_date,
      end_date: event.end_date,
    })

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
      <Button
        onClick={open}
        variant="filled"
        color="indigo"
        size="xs"
        leftIcon={<IconPlus size={16} stroke={1.5} />}
      >
        Add Course
      </Button>
      <Modal opened={opened} size={'lg'} onClose={close} title={'Add Course'}>
        <Stack spacing={8} p={'md'}>
          <TextInput
            required
            label="Course Name"
            size="xs"
            placeholder="Course Name"
            value={event.course_name}
            onChange={(event) =>
              updateEvent({ course_name: event.currentTarget.value })
            }
          />

          <TextInput
            required
            label="Course Code"
            size="xs"
            placeholder="Course Code"
            value={event.course_code}
            onChange={(event) =>
              updateEvent({ course_code: event.currentTarget.value })
            }
          />

          <Textarea
            required
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
            required
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
            onChange={(value) =>
              updateEvent({ start_date: value?.toISOString() })
            }
          />

          <DateInput
            required
            label="End Date"
            placeholder="End Date"
            size="xs"
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

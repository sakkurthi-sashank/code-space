import { Database } from '@/types/supabase'
import { ActionIcon, Button, Modal, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useQueryClient } from 'react-query'

export function EnrollToCourse() {
  const [opened, { open, close }] = useDisclosure(false)
  const [courseCode, setCourseCode] = useState<string>('')
  const [error, setError] = useState<string>('')
  const user = useSession()?.user
  const queryClient = useQueryClient()

  const supabaseClient = useSupabaseClient<Database>()

  const onChangeCourseId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setCourseCode(e.target.value)
  }

  const handleEnrollCourse = async () => {
    if (!courseCode) {
      setError('Course code is required.')
      return
    }

    const { error: courseError, data: courseData } = await supabaseClient
      .from('course')
      .select('*')
      .eq('enroll_code', courseCode)
      .limit(1)
      .maybeSingle()

    if (courseError) {
      setError("Couldn't enroll to the course. Please try again.")
      return
    }

    const { error: previousDataError, data: previousData } =
      await supabaseClient
        .from('profile_enrolled_course')
        .select('*')
        .eq('course_id', courseData?.id)
        .eq('profile_id', user?.id!)

    if (previousDataError) {
      setError("Couldn't enroll to the course. Please try again.")
      return
    }

    if (previousData?.length) {
      setError('You are already enrolled to this course.')
      return
    }

    const { data, error } = await supabaseClient
      .from('profile_enrolled_course')
      .insert({
        course_id: courseData?.id!,
        profile_id: user?.id!,
      })
      .select('*')

    if (error) {
      setError("Couldn't enroll to the course. Please try again.")
      return
    }

    if (data) {
      queryClient.invalidateQueries('student-courses')
      close()
      setCourseCode('')
      setError('')
    }
  }

  return (
    <div>
      <div className="fixed bottom-10 right-10">
        <ActionIcon
          variant="light"
          color="indigo"
          radius="xl"
          size="xl"
          onClick={open}
        >
          <IconPlus size={24} stroke={1.5} />
        </ActionIcon>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        size={'md'}
        title="Enroll to Course"
      >
        <TextInput
          radius={'md'}
          error={error}
          onChange={onChangeCourseId}
          size="sm"
          description="Enter the course code provided by your professor"
          placeholder="Enter Course Code"
        />

        <div className="flex mt-4 items-center justify-end">
          <Button fw={500} size="xs" onClick={handleEnrollCourse}>
            Enroll
          </Button>
        </div>
      </Modal>
    </div>
  )
}

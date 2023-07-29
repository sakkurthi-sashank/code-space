import { ActionIcon, Button, Modal, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'

export function EnrollToCourse() {
  const [opened, { open, close }] = useDisclosure(false)
  const [course_id, setCourseId] = useState<string>('')
  const [error, setError] = useState<string>('')
  const user = useSession()?.user

  const supabaseClient = useSupabaseClient()

  const onChangeCourseId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setCourseId(e.currentTarget.value)
  }

  const handleEnrollCourse = async () => {
    if (!course_id) {
      setError('Course code is required.')
      return
    }

    const { error: previousDataError, data: previousData } =
      await supabaseClient
        .from('profile_enrolled_course')
        .select('*')
        .eq('course_id', course_id)
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
        course_id: course_id,
        profile_id: user?.id!,
      })
      .select('*')

    if (error) {
      setError("Couldn't enroll to the course. Please try again.")
      return
    }

    if (data) {
      close()
      setCourseId('')
      setError('')
    }
  }

  return (
    <>
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
        size={'lg'}
        title="Enroll to Course"
      >
        <div className="p-4 space-y-6">
          <TextInput
            label="Course Code"
            radius={'md'}
            error={error}
            onChange={onChangeCourseId}
            size="sm"
            description="Enter the course code provided by your professor"
            placeholder="Enter Course Code"
          />

          <div className="flex items-center justify-end">
            <Button fw={500} size="xs" onClick={handleEnrollCourse}>
              Enroll
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

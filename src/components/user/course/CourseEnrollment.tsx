import { Database } from '@/types/supabase'
import { ActionIcon, Box, Button, Group, Modal, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'

export function CourseEnrollment() {
  const [opened, { open, close }] = useDisclosure(false)
  const [loading, setLoading] = useState(false)
  const user = useSession()
  const queryClient = useQueryClient()

  const {
    register,
    formState: { errors },
    setError,
    reset,
    handleSubmit,
  } = useForm<{
    courseCode: string
  }>({
    defaultValues: {
      courseCode: '',
    },
  })

  const supabaseClient = useSupabaseClient<Database>()

  async function handleCourseEnrollmentWithCode(values: {
    courseCode: string
  }) {
    setLoading(true)

    const { error: courseError, data: courseData } = await supabaseClient
      .from('course')
      .select('id')
      .eq('enrollent_code', values.courseCode)
      .limit(1)
      .maybeSingle()

    if (courseData === null || courseError) {
      setError('courseCode', {
        message: "Couldn't enroll to the course. Please try again.",
      })
      setLoading(false)
      return
    }

    const { error: previousDataError, data: previousData } =
      await supabaseClient
        .from('course_enrollment')
        .select('*')
        .eq('course_id', courseData?.id)
        .eq('profile_id', user?.user.id!)
        .limit(1)
        .maybeSingle()

    if (previousDataError || previousData !== null) {
      setError('courseCode', {
        message: "Couldn't enroll to the course. Please try again.",
      })
      setLoading(false)
      return
    }

    const { data, error } = await supabaseClient
      .from('course_enrollment')
      .insert({
        course_id: courseData?.id!,
        profile_id: user?.user?.id!,
      })
      .select(`id`)

    if (error) {
      setError('courseCode', {
        message: "Couldn't enroll to the course. Please try again.",
      })
      setLoading(false)
      return
    }

    if (data) {
      queryClient.invalidateQueries('user-courses')
      reset()
      close()
    }
    setLoading(false)
    return
  }

  const handleCloseButton = () => {
    reset()
    close()
  }

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: '40px',
          right: '40px',
        }}
      >
        <ActionIcon
          variant="filled"
          color="indigo"
          radius="xl"
          size="xl"
          onClick={open}
        >
          <IconPlus size={24} stroke={1.5} />
        </ActionIcon>
      </Box>
      <Modal
        opened={opened}
        onClose={handleCloseButton}
        fullScreen
        title="Enroll to Course"
      >
        <form
          style={{ padding: '0.5rem' }}
          onSubmit={handleSubmit(handleCourseEnrollmentWithCode)}
        >
          <TextInput
            size="sm"
            radius={'md'}
            error={errors.courseCode?.message}
            description="Enter the course code provided by your professor"
            placeholder="Enter Course Code"
            {...register('courseCode', { required: 'Course Code is required' })}
          />
          <Group
            spacing={'xs'}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              paddingTop: '0.75rem',
            }}
          >
            <Button
              fw={500}
              color="red"
              variant="filled"
              size="xs"
              uppercase
              onClick={handleCloseButton}
            >
              Cancel
            </Button>
            <Button
              fw={500}
              uppercase
              size="xs"
              type="submit"
              loading={loading}
            >
              Enroll to Course
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  )
}

import { Course } from '@/types/databaseExtractTypes.ts'
import { Database } from '@/types/supabase'
import { Button, Drawer, TextInput, Textarea } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'

export function AddCourse() {
  const [opened, { open, close }] = useDisclosure(false)
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)
  const supabaseClient = useSupabaseClient<Database>()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<Course>({
    defaultValues: {
      course_name: '',
      course_code: '',
      course_description: '',
      course_image: '',
      start_date: '',
      end_date: '',
    },
  })

  const createCourse = async (values: Course) => {
    setLoading(true)

    const { data, error } = await supabaseClient
      .from('course')
      .insert({
        course_name: values.course_name!,
        course_code: values.course_code!,
        course_description: values.course_description!,
        course_image: values.course_image!,
        start_date: values.start_date!,
        end_date: values.end_date!,
        enrollent_code: Math.random().toString(36).substring(7),
      })
      .select('*')

    if (error) {
      setLoading(false)
      setError('root', { message: error.message })
    }

    if (data) {
      setLoading(false)
      reset()
      queryClient.invalidateQueries('admin-courses')
      close()
    }
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
        Create Course
      </Button>
      <Drawer
        opened={opened}
        size="xl"
        position="right"
        onClose={close}
        title="Create Course"
      >
        <form onSubmit={handleSubmit(createCourse)} className="space-y-4">
          <Textarea
            {...register('course_name', {
              required: "Course Name can't be empty",
            })}
            description="Course Name"
            placeholder="Course Name"
            minRows={2}
            radius="md"
            autosize
            error={errors.course_name?.message}
          />

          <Textarea
            {...register('course_code', {
              required: "Course Code can't be empty",
            })}
            description="Course Code"
            placeholder="Course Code"
            radius="md"
            minRows={2}
            autosize
            error={errors.course_code?.message}
          />

          <Textarea
            {...register('course_description', {
              required: "Course Description can't be empty",
            })}
            description="Course Description"
            placeholder="Course Description"
            autosize
            minRows={4}
            radius="md"
            error={errors.course_description?.message}
          />

          <TextInput
            {...register('course_image', {
              required: "Course Image can't be empty",
            })}
            description="Course Image"
            placeholder="Course Image"
            radius="md"
            error={errors.course_image?.message}
          />

          <DatePickerInput
            {...register('start_date')}
            description="Start Date"
            placeholder="Start Date"
            radius="md"
            error={errors.start_date?.message}
            onChange={(value) => setValue('start_date', value?.toISOString())}
          />

          <DatePickerInput
            {...register('end_date')}
            description="End Date"
            placeholder="End Date"
            radius="md"
            error={errors.end_date?.message}
            onChange={(value) => setValue('end_date', value?.toISOString())}
          />

          {errors.root && (
            <div className="text-red-500 text-sm mt-2">
              {errors.root.message}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button onClick={close} fw={500} size="xs" variant="light">
              Cancel
            </Button>
            <Button
              type="submit"
              className="ml-2"
              size="xs"
              loading={loading}
              fw={500}
            >
              Create Course
            </Button>
          </div>
        </form>
      </Drawer>
    </>
  )
}

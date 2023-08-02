import { Database } from '@/types/supabase'
import { Course } from '@/types/types'
import { Button, Modal, TextInput, Textarea } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'

export function AddCourse() {
  const [opened, { open, close }] = useDisclosure(false)
  const supabaseClient = useSupabaseClient<Database>()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)

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
      })
      .select('*')

    if (error) {
      setLoading(false)
      setError('root', { message: error.message })
    }

    if (data) {
      setLoading(false)
      reset()
      queryClient.invalidateQueries('courses')
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
        Add Course
      </Button>
      <Modal opened={opened} size={'lg'} title={'Add Course'} onClose={close}>
        <form onSubmit={handleSubmit(createCourse)} className="space-y-1.5 p-3">
          <TextInput
            label="Course Name"
            size="xs"
            placeholder="Course Name"
            required
            error={errors.course_name?.message}
            {...register('course_name')}
          />

          <TextInput
            required
            label="Course Code"
            size="xs"
            placeholder="Course Code"
            error={errors.course_code?.message}
            {...register('course_code')}
          />

          <Textarea
            required
            label="Course Description"
            placeholder="Course Description"
            size="xs"
            autosize
            error={errors.course_description?.message}
            {...register('course_description')}
          />

          <TextInput
            required
            label="Course Image"
            placeholder="Course Image"
            size="xs"
            error={errors.course_image?.message}
            {...register('course_image')}
          />

          <DateInput
            label="Start Date"
            required
            size="xs"
            placeholder="Start Date"
            error={errors.start_date?.message}
            onChange={(value) => setValue('start_date', value?.toISOString()!)}
          />

          <DateInput
            required
            label="End Date"
            placeholder="End Date"
            size="xs"
            error={errors.end_date?.message}
            onChange={(value) => setValue('end_date', value?.toISOString()!)}
          />

          {errors.root && (
            <div className="text-red-500 text-sm mt-2">
              {errors.root.message}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button onClick={close} fw={500} variant="light" size="xs">
              Cancel
            </Button>
            <Button
              size="xs"
              type="submit"
              className="ml-2"
              loading={loading}
              fw={500}
            >
              Add Course
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

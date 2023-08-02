import { Database } from '@/types/supabase'
import { Course } from '@/types/types'
import { ActionIcon, Button, Modal, TextInput, Textarea } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconEdit } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'

export function EditCourse(props: Course) {
  const [opened, { open, close }] = useDisclosure(false)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  const supabaseClient = useSupabaseClient<Database>()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    setError,
    formState: { errors },
  } = useForm<Course>({
    defaultValues: {
      ...props,
    },
  })

  useEffect(() => {
    reset({
      ...props,
    })
  }, [props, reset])

  const handleEditCourse = async (values: Course) => {
    setLoading(true)

    const { data, error } = await supabaseClient
      .from('course')
      .update(values)
      .eq('id', props.id)
      .select('*')

    if (error) {
      setLoading(false)
      setError('root', { message: error.message })
      return
    }

    if (data) {
      setLoading(false)
      queryClient.invalidateQueries('courses')
      close()
    }
  }

  return (
    <>
      <ActionIcon onClick={open} color="gray">
        <IconEdit size={18} stroke={1.5} />
      </ActionIcon>
      <Modal opened={opened} size={'lg'} onClose={close} title={'Edit Course'}>
        <form
          onSubmit={handleSubmit(handleEditCourse)}
          className="space-y-1.5 p-3"
        >
          <TextInput
            label="Course Name"
            size="xs"
            required
            placeholder="Course Name"
            {...register('course_name')}
          />

          <TextInput
            label="Course Code"
            size="xs"
            placeholder="Course Code"
            {...register('course_code')}
          />

          <Textarea
            label="Course Description"
            placeholder="Course Description"
            size="xs"
            autosize
            {...register('course_description')}
          />

          <TextInput
            label="Course Image"
            placeholder="Course Image"
            size="xs"
            {...register('course_image')}
          />

          <DateInput
            label="Start Date"
            required
            defaultValue={new Date(getValues('start_date')!)}
            size="xs"
            placeholder="Start Date"
            onChange={(value) => setValue('start_date', value?.toISOString()!)}
          />

          <DateInput
            label="End Date"
            placeholder="End Date"
            defaultValue={new Date(getValues('end_date')!)}
            size="xs"
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
              fw={500}
              loading={loading}
            >
              Edit Course
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

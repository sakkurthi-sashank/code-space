import { Course } from '@/types/databaseExtractTypes.ts'
import { Database } from '@/types/supabase'
import { ActionIcon, Button, Drawer, Group, Textarea } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
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
      .eq('id', props.id!)
      .select('id')

    if (error) {
      setLoading(false)
      setError('root', { message: error.message })
      return
    }

    if (data) {
      setLoading(false)
      queryClient.invalidateQueries('admin-courses')
      close()
    }
  }

  return (
    <>
      <ActionIcon onClick={open} color="gray">
        <IconEdit size={18} stroke={1.5} />
      </ActionIcon>
      <Drawer
        opened={opened}
        size={'100%'}
        position="right"
        onClose={close}
        title="Edit Course"
      >
        <form onSubmit={handleSubmit(handleEditCourse)} className="space-y-3">
          <Textarea
            {...register('course_name')}
            description="Course Name"
            radius="md"
            autosize
            minRows={2}
            placeholder="Course Name"
          />

          <Textarea
            {...register('course_code')}
            description="Course Code"
            radius="md"
            minRows={2}
            autosize
            placeholder="Course Code"
          />

          <Textarea
            {...register('course_description')}
            description="Course Description"
            placeholder="Course Description"
            radius="md"
            minRows={4}
            autosize
          />

          <Textarea
            {...register('course_image')}
            description="Course Image"
            placeholder="Course Image"
            minRows={2}
            autosize
            radius="md"
          />

          <DatePickerInput
            {...register('start_date')}
            description="Start Date"
            defaultValue={new Date(getValues('start_date')!)}
            placeholder="Start Date"
            radius="md"
            onChange={(value) => setValue('start_date', value?.toISOString()!)}
          />

          <DatePickerInput
            {...register('end_date')}
            description="End Date"
            placeholder="End Date"
            radius="md"
            defaultValue={new Date(getValues('end_date')!)}
            onChange={(value) => setValue('end_date', value?.toISOString()!)}
          />

          {errors.root && (
            <div className="text-red-500 text-sm mt-2">
              {errors.root.message}
            </div>
          )}

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
              onClick={close}
              fw={500}
              color="red"
              variant="filled"
              size="xs"
              uppercase
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="ml-2"
              fw={500}
              loading={loading}
              size="xs"
              uppercase
            >
              Edit Course
            </Button>
          </Group>
        </form>
      </Drawer>
    </>
  )
}

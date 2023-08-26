import { Module } from '@/types/databaseExtractTypes.ts'
import { Database } from '@/types/supabase'
import {
  ActionIcon,
  Button,
  Drawer,
  NumberInput,
  TextInput,
} from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconEdit } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'

export function EditCourseModule(props: Module) {
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
  } = useForm<Module>({
    defaultValues: {
      ...props,
    },
  })

  useEffect(() => {
    reset({
      ...props,
    })
  }, [props, reset])

  const handleEditCourse = async (values: Module) => {
    setLoading(true)

    const { data, error } = await supabaseClient
      .from('module')
      .update(values)
      .eq('id', props.id!)
      .select('*')

    if (error) {
      setLoading(false)
      setError('root', { message: error.message })
      return
    }

    if (data) {
      setLoading(false)
      queryClient.invalidateQueries('admin-modules')
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
        size="100%"
        position="right"
        onClose={close}
        title="Edit Course"
      >
        <form onSubmit={handleSubmit(handleEditCourse)} className="space-y-3">
          <TextInput
            description="Module Name"
            radius="md"
            placeholder="Module Name"
            {...register('module_name')}
          />

          <NumberInput
            description="Duration"
            radius="md"
            placeholder="Duration"
            defaultValue={getValues('duration')!}
            onChange={(value) => setValue('duration', Number(value))}
          />

          <DateTimePicker
            description="Start Date"
            radius="md"
            defaultValue={new Date(getValues('start_date')!)}
            placeholder="Start Date"
            onChange={(value) => setValue('start_date', value?.toISOString()!)}
          />

          <DateTimePicker
            description="End Date"
            radius="md"
            placeholder="End Date"
            defaultValue={new Date(getValues('end_date')!)}
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
              type="submit"
              className="ml-2"
              fw={500}
              loading={loading}
              size="xs"
            >
              Edit Course
            </Button>
          </div>
        </form>
      </Drawer>
    </>
  )
}

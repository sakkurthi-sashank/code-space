import { Database } from '@/types/supabase'
import { Module } from '@/types/types'
import { Button, Modal, NumberInput, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'

export function AddCourseModule({ courseId }: { courseId: string }) {
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
  } = useForm<Module>({
    defaultValues: {
      duration: 0,
      start_date: '',
      end_date: '',
      module_name: '',
    },
  })

  const createCourse = async (values: Module) => {
    setLoading(true)

    const { data, error } = await supabaseClient
      .from('module')
      .insert({
        course_id: courseId,
        duration: values.duration!,
        start_date: values.start_date!,
        end_date: values.end_date!,
        module_name: values.module_name!,
      })
      .select('*')

    if (error) {
      setLoading(false)
      setError('root', { message: error.message })
    }

    if (data) {
      setLoading(false)
      reset()
      queryClient.invalidateQueries('modules')
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
        Add Module
      </Button>
      <Modal opened={opened} size={'lg'} title={'Add Course'} onClose={close}>
        <form onSubmit={handleSubmit(createCourse)} className="space-y-1.5 p-3">
          <TextInput
            label="Module Name"
            size="xs"
            placeholder="Module Name"
            required
            error={errors.module_name?.message}
            {...register('module_name')}
          />

          <NumberInput
            label="Duration"
            size="xs"
            placeholder="Duration"
            required
            error={errors.duration?.message}
            onChange={(value) => setValue('duration', Number(value))}
          />

          <DatePickerInput
            label="Start Date"
            required
            size="xs"
            placeholder="Start Date"
            dropdownType="modal"
            error={errors.start_date?.message}
            onChange={(value) => setValue('start_date', value?.toISOString()!)}
          />

          <DatePickerInput
            required
            label="End Date"
            placeholder="End Date"
            size="xs"
            dropdownType="modal"
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
              Add Module
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

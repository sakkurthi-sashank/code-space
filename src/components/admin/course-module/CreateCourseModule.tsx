import { Module } from '@/types/databaseExtractTypes.ts'
import { Database } from '@/types/supabase'
import { Button, Drawer, NumberInput, Textarea } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { DrawerFormActionButtons } from '../common/DrawerFormActionButtons'

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
      queryClient.invalidateQueries('admin-modules')
      close()
    }
  }

  return (
    <>
      <Button
        onClick={open}
        variant="light"
        color="indigo"
        fw={500}
        size="xs"
        leftIcon={<IconPlus size={16} stroke={1.75} />}
      >
        Add Module
      </Button>
      <Drawer
        title={'Create Course Module'}
        opened={opened}
        size={'100%'}
        position="right"
        onClose={close}
      >
        <form onSubmit={handleSubmit(createCourse)} className="space-y-3">
          <Textarea
            description="Module Name"
            placeholder="Module Name"
            radius={'md'}
            minRows={2}
            error={errors.module_name?.message}
            {...register('module_name')}
          />

          <NumberInput
            description="Duration"
            placeholder="Duration"
            radius={'md'}
            error={errors.duration?.message}
            onChange={(value) => setValue('duration', Number(value))}
          />

          <DatePickerInput
            description="Start Date"
            placeholder="Start Date"
            radius={'md'}
            error={errors.start_date?.message}
            onChange={(value) => setValue('start_date', value?.toISOString()!)}
          />

          <DatePickerInput
            description="End Date"
            placeholder="End Date"
            radius={'md'}
            error={errors.end_date?.message}
            onChange={(value) => setValue('end_date', value?.toISOString()!)}
          />

          {errors.root && (
            <div className="text-red-500 text-sm mt-2">
              {errors.root.message}
            </div>
          )}

          <DrawerFormActionButtons close={close} loading={loading} />
        </form>
      </Drawer>
    </>
  )
}

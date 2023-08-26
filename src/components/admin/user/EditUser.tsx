import { Profile } from '@/types/databaseExtractTypes.ts'
import { Database } from '@/types/supabase'
import { ActionIcon, Button, Drawer, Switch, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconEdit } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'

export function EditUser(props: Profile) {
  const [opened, { open, close }] = useDisclosure(false)
  const queryClient = useQueryClient()
  const supabaseClient = useSupabaseClient<Database>()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<Profile>({
    defaultValues: {
      ...props,
    },
  })

  useEffect(() => {
    reset({
      ...props,
    })
  }, [props, reset])

  async function handleEditUser(values: Profile) {
    setLoading(true)

    const { error, data } = await supabaseClient
      .from('profile')
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
      queryClient.invalidateQueries('admin-profiles')
      close()
    }
  }

  return (
    <>
      <ActionIcon onClick={open} color="gray">
        <IconEdit size={18} stroke={1.5} />
      </ActionIcon>
      <Drawer
        position="right"
        title="Update Profile"
        opened={opened}
        size={'100%'}
        onClose={close}
      >
        <form onSubmit={handleSubmit(handleEditUser)} className="space-y-2">
          <TextInput
            placeholder="Admission Number"
            label="Admission Number"
            size="xs"
            radius={'md'}
            {...register('admission_number')}
          />

          <TextInput
            placeholder="Display Name"
            label="Display Name"
            size="xs"
            radius={'md'}
            {...register('display_name')}
          />

          <TextInput
            placeholder="Email Address"
            disabled
            size="xs"
            label="Email Address"
            radius={'md'}
            {...register('email_address')}
          />

          <Switch
            pt={6}
            label="Admin"
            size="xs"
            defaultChecked={props.is_admin!}
            onChange={(event) =>
              setValue('is_admin', event.currentTarget.checked)
            }
          />

          <TextInput
            placeholder="Phone Number"
            label="Phone Number"
            size="xs"
            radius={'md'}
            {...register('phone_number')}
          />

          <TextInput
            placeholder="Branch"
            label="Branch"
            size="xs"
            radius={'md'}
            {...register('branch')}
          />

          <TextInput
            placeholder="Batch"
            size="xs"
            label="Batch"
            radius={'md'}
            {...register('batch')}
          />

          <TextInput
            placeholder="Section"
            label="Section"
            size="xs"
            radius={'md'}
            {...register('section')}
          />

          {errors.root && (
            <div className="text-red-500 text-sm mt-2">
              {errors.root.message}
            </div>
          )}

          <div className="flex justify-end pt-4 space-x-4">
            <Button onClick={close} size="xs" fw={500} variant="light">
              Cancel
            </Button>
            <Button
              variant="filled"
              size="xs"
              fw={500}
              type="submit"
              loading={loading}
            >
              Update
            </Button>
          </div>
        </form>
      </Drawer>
    </>
  )
}

import { Profile } from '@/types/databaseExtractTypes.ts'
import { Database } from '@/types/supabase'
import { ActionIcon, Checkbox, Drawer, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconEdit } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { DrawerFormActionButtons } from '../common/DrawerFormActionButtons'

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
        <form onSubmit={handleSubmit(handleEditUser)} className="space-y-4">
          <TextInput
            placeholder="Admission Number"
            description="Admission Number"
            {...register('admission_number')}
          />

          <TextInput
            placeholder="Display Name"
            description="Display Name"
            {...register('display_name')}
          />

          <TextInput
            placeholder="Email Address"
            disabled
            description="Email Address"
            {...register('email_address')}
          />

          <TextInput
            placeholder="Phone Number"
            description="Phone Number"
            {...register('phone_number')}
          />

          <TextInput
            placeholder="Branch"
            description="Branch"
            {...register('branch')}
          />

          <TextInput
            placeholder="Batch"
            description="Batch"
            {...register('batch')}
          />

          <TextInput
            placeholder="Section"
            description="Section"
            {...register('section')}
          />

          <Checkbox
            defaultChecked={props.is_admin!}
            onChange={(event) =>
              setValue('is_admin', event.currentTarget.checked)
            }
            description="do you want to make this user admin?"
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

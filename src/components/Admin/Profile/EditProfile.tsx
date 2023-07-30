import { Profile } from '@/types/types'
import { ActionIcon, Button, Modal, Switch, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconEdit } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'

export function EditProfile(props: Profile) {
  const [opened, { open, close }] = useDisclosure(false)
  const queryClient = useQueryClient()
  const supabaseClient = useSupabaseClient()
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

  async function handleEditProfile(values: Profile) {
    setLoading(true)

    const { error, data } = await supabaseClient
      .from('profile')
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
      queryClient.invalidateQueries('profiles')
      close()
    }
  }

  return (
    <>
      <ActionIcon onClick={open} color="gray">
        <IconEdit size={18} stroke={1.5} />
      </ActionIcon>
      <Modal title="Update Profile" opened={opened} size={'xl'} onClose={close}>
        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className="space-y-1.5 p-3"
        >
          <TextInput
            placeholder="Admission Number"
            label="Admission Number"
            size="xs"
            {...register('admission_number')}
          />

          <TextInput
            placeholder="Display Name"
            label="Display Name"
            size="xs"
            {...register('display_name')}
          />

          <TextInput
            placeholder="Email Address"
            disabled
            label="Email Address"
            size="xs"
            {...register('email_address')}
          />

          <Switch
            label="Is Admin"
            defaultChecked={props.is_admin!}
            onChange={(event) =>
              setValue('is_admin', event.currentTarget.checked)
            }
            size="xs"
          />

          <TextInput
            placeholder="Phone Number"
            label="Phone Number"
            size="xs"
            {...register('phone_number')}
          />

          <TextInput
            placeholder="Branch"
            label="Branch"
            size="xs"
            {...register('branch')}
          />

          <TextInput
            placeholder="Batch"
            label="Batch"
            size="xs"
            {...register('batch')}
          />

          <TextInput
            placeholder="Section"
            label="Section"
            size="xs"
            {...register('section')}
          />

          {errors.root && (
            <div className="text-red-500 text-sm mt-2">
              {errors.root.message}
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={close} fw={500} variant="light" size="xs">
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
      </Modal>
    </>
  )
}

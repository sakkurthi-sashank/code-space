import { ActionIcon, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconTrash } from '@tabler/icons-react'
import { useQueryClient } from 'react-query'

export const DeleteProfile = ({ userId }: { userId: string }) => {
  const supabaseClient = useSupabaseClient()
  const queryClient = useQueryClient()

  const handleDeleteProfile = async () => {
    modals.openConfirmModal({
      title: 'Delete Profile',
      children: (
        <Text size="sm" color="red" weight={400}>
          Are you sure you want to delete this profile? This action cannot be
          undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        const { data, error } = await supabaseClient.auth.admin.deleteUser(
          userId,
        )

        queryClient.invalidateQueries('profiles')

        !error && data && close()
      },
    })
  }

  return (
    <ActionIcon
      variant="light"
      color="red"
      onClick={() => handleDeleteProfile()}
    >
      <IconTrash size={18} stroke={1.5} />
    </ActionIcon>
  )
}

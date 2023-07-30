import { ActionIcon, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconTrash } from '@tabler/icons-react'
import { useQueryClient } from 'react-query'

export function DeleteProfile({ userId }: { userId: string }) {
  const supabaseClient = useSupabaseClient()
  const queryClient = useQueryClient()

  async function handleDeleteProfile() {
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
        const { data } = await supabaseClient.auth.admin.deleteUser(userId)

        if (data) {
          queryClient.invalidateQueries('profiles')
          close()
        }
      },
    })
  }

  return (
    <ActionIcon variant="light" color="red" onClick={handleDeleteProfile}>
      <IconTrash size={18} stroke={1.5} />
    </ActionIcon>
  )
}

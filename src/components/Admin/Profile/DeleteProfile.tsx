import { supabase } from '@/libs/supabase'
import { ActionIcon } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconTrash } from '@tabler/icons-react'

export const DeleteProfile = ({ userId }: { userId: string }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase.auth.admin.deleteUser(userId)

    if (error) {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      })
    }

    if (data) {
      notifications.show({
        title: 'Success',
        message: 'User deleted successfully',
        color: 'green',
      })
    }
  }

  return (
    <ActionIcon variant="light" color="red" size={'md'} onClick={handleDelete}>
      <IconTrash size={'1.2rem'} stroke={1.5} />
    </ActionIcon>
  )
}

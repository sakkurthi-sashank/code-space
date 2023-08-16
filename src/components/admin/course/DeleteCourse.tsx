import { Database } from '@/types/supabase'
import { ActionIcon, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconTrash } from '@tabler/icons-react'
import { useQueryClient } from 'react-query'

export function DeleteCourse({ id }: { id: string }) {
  const queryClient = useQueryClient()
  const supabaseClient = useSupabaseClient<Database>()

  const handleDeleteCourse = async () => {
    modals.openConfirmModal({
      title: 'Delete Course',
      children: (
        <Text size="sm" color="red" weight={400}>
          Are you sure you want to delete this course? This action cannot be
          undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        const { data } = await supabaseClient
          .from('course')
          .delete()
          .eq('id', id)
          .select('id')

        if (data) {
          queryClient.invalidateQueries('admin-courses')
          close()
        }
      },
    })
  }

  return (
    <ActionIcon onClick={handleDeleteCourse} color="red">
      <IconTrash size={18} stroke={1.5} />
    </ActionIcon>
  )
}

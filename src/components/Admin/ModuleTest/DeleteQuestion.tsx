import { Database } from '@/types/supabase'
import { ActionIcon, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconTrash } from '@tabler/icons-react'
import { useQueryClient } from 'react-query'

export function DeleteCourseModule({ id }: { id: string }) {
  const supabaseClient = useSupabaseClient<Database>()
  const queryClient = useQueryClient()

  const handleDeleteCourseModule = async () => {
    modals.openConfirmModal({
      title: 'Delete Course',

      children: (
        <Text size="sm" color="red" weight={400}>
          Are you sure you want to delete this course module? This action cannot
          be undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },

      onConfirm: async () => {
        const { data } = await supabaseClient
          .from('module')
          .delete()
          .eq('id', id)
          .select('*')

        if (data) {
          queryClient.invalidateQueries('modules')
          close()
        }
      },
    })
  }

  return (
    <ActionIcon onClick={handleDeleteCourseModule} color="red">
      <IconTrash size={18} stroke={1.5} />
    </ActionIcon>
  )
}

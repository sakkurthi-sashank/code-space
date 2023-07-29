import { supabase } from '@/libs/supabase'
import { ActionIcon, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconTrash } from '@tabler/icons-react'

export function DeleteCourse({ id }: { id: string }) {
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
        const { data, error } = await supabase
          .from('course')
          .delete()
          .eq('id', id)
        if (error) {
          throw error
        }
        if (data) {
          close()
        }
      },
    })
  }

  return (
    <>
      <ActionIcon onClick={handleDeleteCourse} color="red">
        <IconTrash size={18} stroke={1.5} />
      </ActionIcon>
    </>
  )
}

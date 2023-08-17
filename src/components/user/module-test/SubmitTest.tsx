import { Database } from '@/types/supabase'
import { Button, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

export function SubmitTest({ moduleId }: { moduleId: string }) {
  const supabaseClient = useSupabaseClient<Database>()
  const router = useRouter()
  const userId = useSession()?.user.id

  const handleSubmitCompleteTest = async () => {
    modals.openConfirmModal({
      title: 'Submit Test',
      children: (
        <Text size="sm" color="red" weight={400}>
          Are you sure you want to submit this test? This action cannot be
          undone.
        </Text>
      ),
      labels: { confirm: 'Submit', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        const { data, error } = await supabaseClient
          .from('profile_submitted_module')
          .update({ is_submitted: true })
          .eq('profile_id', userId)
          .eq('module_id', moduleId)
          .select('*')
        if (error) {
          return
        }
        if (data) {
          router.push('/courses')
        }
      },
    })
  }

  return (
    <Button
      size="xs"
      color="red"
      radius={'sm'}
      fw={600}
      uppercase
      onClick={handleSubmitCompleteTest}
    >
      Submit
    </Button>
  )
}

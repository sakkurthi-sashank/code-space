import { Database } from '@/types/supabase'
import { Button } from '@mantine/core'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

export function SubmitTest({ moduleId }: { moduleId: string }) {
  const supabaseClient = useSupabaseClient<Database>()
  const router = useRouter()
  const userId = useSession()?.user.id

  const handleSubmitCompleteTest = async () => {
    const { data, error } = await supabaseClient
      .from('profile_submitted_module')
      .insert([
        {
          module_id: moduleId,
          is_submitted: true,
          profile_id: userId!,
        },
      ])
      .select('*')
    if (error) {
      return
    }
    if (data) {
      router.push('/courses')
    }
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

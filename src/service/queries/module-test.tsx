import { Database } from '@/types/supabase'
import { CodingQuestion } from '@/types/types'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from 'react-query'

export function useFetchUserModuleTestsQuestionsFromSupabase({
  moduleId,
}: {
  moduleId: string
}) {
  const user = useSession()?.user
  const supabaseClient = useSupabaseClient<Database>()

  const { data, error, isLoading } = useQuery<CodingQuestion[], Error>(
    'user-module-tests-questions',
    async () => {
      const { data, error } = await supabaseClient
        .from('coding_question')
        .select('*')
        .eq('module_id', moduleId)
        .order('created_at', { ascending: false })
      return error ? [] : data || []
    },
    {
      enabled: !!user?.id,
    },
  )
  return { data: data || [], error, isLoading }
}

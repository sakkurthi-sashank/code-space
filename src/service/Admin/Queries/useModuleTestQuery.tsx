import { Database } from '@/types/supabase'
import { CodingQuestion } from '@/types/types'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from 'react-query'

export function useModuleTestQuery(moduleId: string) {
  const user = useSession()?.user
  const supabaseClient = useSupabaseClient<Database>()

  const { data, error, isLoading } = useQuery<CodingQuestion[], Error>(
    'module-test',
    async () => {
      const { data, error } = await supabaseClient
        .from('coding_question')
        .select('*')
        .eq('module_id', moduleId)
        .order('created_at', { ascending: false })
      return error ? [] : data || []
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!user?.id,
    },
  )
  return { data: data || [], error, isLoading }
}

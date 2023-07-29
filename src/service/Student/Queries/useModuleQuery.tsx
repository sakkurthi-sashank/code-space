import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Module from 'module'
import { useQuery } from 'react-query'

interface ModuleData extends Module {
  coding_question: {
    id: string
  }[]
}

export function useModuleQuery({ courseId }: { courseId: string }) {
  const user = useSession()?.user
  const supabaseClient = useSupabaseClient()

  const { data, error, isLoading } = useQuery<ModuleData[], Error>(
    ['courses', courseId],
    async () => {
      if (!user?.id || !courseId) {
        return []
      }

      const { data, error } = await supabaseClient
        .from('module')
        .select(`*, coding_question(id)`)
        .eq('course_id', courseId)
        .order('module_name', { ascending: false })

      return error ? [] : data || []
    },
    {
      enabled: !!user?.id,
    },
  )

  return { data: data || [], error, isLoading }
}

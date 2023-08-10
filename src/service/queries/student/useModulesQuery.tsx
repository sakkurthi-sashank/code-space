import { Database } from '@/types/supabase'
import { Module, ProfileCompletedModule } from '@/types/types'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from 'react-query'

type ModuleData = Module & {
  coding_question: {
    id: string
  }[]
  profile_completed_module: ProfileCompletedModule[]
}

export function useModulesQuery({ courseId }: { courseId: string }) {
  const user = useSession()?.user
  const supabaseClient = useSupabaseClient<Database>()

  const { data, error, isLoading } = useQuery<ModuleData[], Error>(
    ['student-modules', courseId],
    async () => {
      if (!user?.id || !courseId) {
        return []
      }

      const { data, error } = await supabaseClient
        .from('module')
        .select(`*, coding_question(id),profile_completed_module(*)`)
        .eq('course_id', courseId)
        .eq('profile_completed_module.profile_id', user.id)
        .order('module_name', { ascending: false })

      return error ? [] : data || []
    },
    {
      enabled: !!user?.id,
    },
  )
  return { data: data || [], error, isLoading }
}

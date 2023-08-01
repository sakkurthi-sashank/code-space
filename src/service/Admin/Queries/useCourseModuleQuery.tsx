import { Database } from '@/types/supabase'
import { Module } from '@/types/types'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from 'react-query'

export function useCourseModuleQuery(courseId: string) {
  const user = useSession()?.user
  const supabaseClient = useSupabaseClient<Database>()

  const { data, error, isLoading } = useQuery<Module[], Error>(
    'modules',
    async () => {
      const { data, error } = await supabaseClient
        .from('module')
        .select('*')
        .eq('course_id', courseId)
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

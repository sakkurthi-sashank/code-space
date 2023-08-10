import { Database } from '@/types/supabase'
import { Course } from '@/types/types'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from 'react-query'

export function useCoursesQuery() {
  const user = useSession()?.user
  const supabaseClient = useSupabaseClient<Database>()

  const { data, error, isLoading } = useQuery<Course[], Error>(
    'courses',
    async () => {
      const { data, error } = await supabaseClient
        .from('course')
        .select('*')
        .order('created_at', { ascending: false })
      return error ? [] : data || []
    },
    {
      enabled: !!user?.id,
    },
  )

  return { data: data || [], error, isLoading }
}

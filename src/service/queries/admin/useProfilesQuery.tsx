import { Database } from '@/types/supabase'
import { Profile } from '@/types/types'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from 'react-query'

export function useProfilesQuery() {
  const user = useSession()?.user
  const supabaseClient = useSupabaseClient<Database>()

  const { data, error, isLoading } = useQuery<Profile[], Error>(
    'admin-profiles',
    async () => {
      const { data, error } = await supabaseClient.from('profile').select('*')
      return error ? [] : data || []
    },
    {
      enabled: !!user?.id,
    },
  )
  return { data: data || [], error, isLoading }
}

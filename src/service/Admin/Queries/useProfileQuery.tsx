import { Database } from '@/types/supabase'
import { Profile } from '@/types/types'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from 'react-query'

export function useProfileQuery() {
  const user = useSession()?.user
  const supabaseClient = useSupabaseClient<Database>()

  const { data, error, isLoading } = useQuery<Profile[], Error>(
    'profiles',
    async () => {
      const { data, error } = await supabaseClient.from('profile').select('*')
      return error ? [] : data || []
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!user?.id,
    },
  )

  return { data: data || [], error, isLoading }
}
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabaseClient = useSupabaseClient()

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/auth/login')
        }
      },
    )
    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [router, supabaseClient])

  useEffect(() => {
    const fetchUser = async () => {
      const user = await supabaseClient.auth.getSession()
      setUser(user?.data.session?.user ?? null)
      setLoading(false)
    }
    fetchUser()
  }, [router, supabaseClient])

  return { user, loading }
}

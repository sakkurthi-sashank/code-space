import { supabase } from '@/libs/supabase'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/auth/login')
        }
      },
    )
    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [router])

  useEffect(() => {
    const fetchUser = async () => {
      const user = await supabase.auth.getSession()
      setUser(user?.data.session?.user ?? null)
      setLoading(false)
    }
    fetchUser()
  }, [router])

  return { user, loading }
}

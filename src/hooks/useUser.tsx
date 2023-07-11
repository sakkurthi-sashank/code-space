// useUser.ts

import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user
        setUser(currentUser ?? null)
        setLoading(false)

        if (event === 'SIGNED_OUT') {
          sessionStorage.setItem('intendedPage', router.asPath)
          router.push('/sign-in')
        }
      },
    )

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [router])

  useEffect(() => {
    const intendedPage = sessionStorage.getItem('intendedPage')

    if (user && intendedPage) {
      sessionStorage.removeItem('intendedPage')
      router.replace(intendedPage)
    }
  }, [user, router])

  return { user, loading }
}

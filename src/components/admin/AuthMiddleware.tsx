import { Database } from '@/types/supabase'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export const AuthMiddleware = ({ children }: { children: React.ReactNode }) => {
  const user = useSession()
  const supabaseClient = useSupabaseClient<Database>()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user?.user?.id) {
        setIsAdmin(false)
        return
      } else {
        const { data, error } = await supabaseClient
          .from('profile')
          .select('is_admin')
          .eq('id', user.user.id)
          .limit(1)
          .maybeSingle()

        if (error) {
          setIsAdmin(false)
        } else if (data?.is_admin) {
          setIsAdmin(data.is_admin)
        }
      }
    }
    checkAdmin()
  }, [user, supabaseClient])

  if (user && isAdmin) {
    return <>{children}</>
  }

  return null
}

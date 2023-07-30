import { useAuth } from '@/hooks/useAuth'
import { Database } from '@/types/supabase'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { CustomError } from './CustomError'

export const AuthAdminWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { user, loading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const supabaseClient = useSupabaseClient<Database>()

  useEffect(() => {
    if (!user) {
      return
    }

    const checkAdmin = async () => {
      const { data, error } = await supabaseClient
        .from('profile')
        .select('is_admin')
        .eq('id', user?.id)
        .limit(1)
        .maybeSingle()

      if (error) {
        setIsAdmin(false)
        return
      }

      if (data?.is_admin) {
        setIsAdmin(data.is_admin!)
      }
    }

    checkAdmin()
  }, [user])

  if (loading) {
    return <></>
  }

  if (user && !isAdmin && !loading) {
    return <CustomError />
  }

  return <>{children}</>
}

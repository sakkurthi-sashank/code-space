import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'

export const AuthAdminWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (!user && !loading) {
    router.push('/login')
    return null
  }

  if (user && !loading && user.user_metadata.role !== 'admin') {
    router.push('/')
    return null
  }

  if (user && !loading && user.user_metadata.role === 'admin') {
    return <>{children}</>
  }
}

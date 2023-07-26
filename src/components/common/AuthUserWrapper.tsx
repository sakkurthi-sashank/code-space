import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'

export const AuthUserWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (!user && !loading) {
    router.push('/auth/login')
    return null
  }

  if (user && !loading) {
    return <>{children}</>
  }
}

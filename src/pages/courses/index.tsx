import { CourseCards } from '@/components/Student/Course/CourseCards'
import { Dashboard } from '@/components/Student/Dashboard'
import { useAuth } from '@/hooks/useAuth'
import { Flex } from '@mantine/core'
import { useRouter } from 'next/router'

export default function CoursesPage() {
  const { user, loading } = useAuth()

  const router = useRouter()

  if (!user && !loading) {
    router.push('/login')
    return null
  }

  if (user) {
    return (
      <Dashboard>
        <Flex className="flex-wrap p-4 gap-4">
          <CourseCards userId={user.id} />
        </Flex>
        <div>{user.email}</div>
      </Dashboard>
    )
  }

  return null
}

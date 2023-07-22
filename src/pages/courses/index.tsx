import { CourseInfoCards } from '@/components/Course/CourseInfoCards'
import { useUserAuth } from '@/hooks/userAuthContext'
import { MainLayout } from '@/layouts/MainLayout'
import { Flex } from '@mantine/core'
import { useRouter } from 'next/router'

export default function CoursesPage() {
  const { user, loading } = useUserAuth()

  const router = useRouter()

  if (!user && !loading) {
    router.push('/login')
    return null
  }

  if (user) {
    return (
      <MainLayout>
        <Flex className="flex-wrap p-4 gap-4">
          <CourseInfoCards userId={user.id} />
        </Flex>
      </MainLayout>
    )
  }

  return null
}

import { InfoCard } from '@/components/Course/InfoCard'
import { useUserAuth } from '@/hooks/userAuthContext'
import { MainLayout } from '@/layouts/MainLayout'
import { useCourseStore } from '@/store/courseStore'
import { Flex } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function CoursesPage() {
  const { user, loading } = useUserAuth()
  const router = useRouter()

  const { courseData, fetchCourses } = useCourseStore((state) => ({
    courseData: state.courseData,
    fetchCourses: state.fetchCourses,
  }))

  useEffect(() => {
    if (user) {
      fetchCourses(user.id)
    }
  }, [user, fetchCourses])

  if (!user && !loading) {
    router.push('/login')
  }

  if (user && !loading) {
    return (
      <MainLayout>
        <Flex className="flex-wrap p-4 gap-4">
          {courseData?.map((course) => (
            <InfoCard {...course} key={course.id} />
          ))}
        </Flex>
      </MainLayout>
    )
  }
}

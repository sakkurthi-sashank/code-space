import { InfoCard } from '@/components/Course/InfoCard'
import { useUserAuth } from '@/hooks/userAuthContext'
import { MainLayout } from '@/layouts/MainLayout'
import { useCourseStore } from '@/store/CourseStore'
import { Flex } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function CoursesPage() {
  const { user, loading } = useUserAuth()
  const router = useRouter()

  const { courseInfoCardsData, fetchCourseInfoCardsData } = useCourseStore(
    (state) => ({
      courseInfoCardsData: state.courseInfoCardsData,
      fetchCourseInfoCardsData: state.fetchCourseInfoCardsData,
    }),
  )

  useEffect(() => {
    if (user) {
      fetchCourseInfoCardsData(user.id)
    }
  }, [user, fetchCourseInfoCardsData])

  if (!user && !loading) {
    router.push('/login')
  }

  if (user && !loading) {
    return (
      <MainLayout>
        <Flex className="flex-wrap p-4 gap-4">
          {courseInfoCardsData?.map((course) => (
            <InfoCard {...course} key={course.id} />
          ))}
        </Flex>
      </MainLayout>
    )
  }
}

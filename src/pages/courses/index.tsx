import { InfoCard } from '@/components/Course/InfoCard'
import { useUserAuth } from '@/hooks/userAuthContext'
import { MainLayout } from '@/layouts/MainLayout'
import { fetchCourses } from '@/service/fetchCourses'
import { Course } from '@/types/course'
import { Flex } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function CoursesPage() {
  const { user, loading } = useUserAuth()
  const router = useRouter()
  const [courseData, setCourseData] = useState<Course[] | null>([])

  useEffect(() => {
    if (!user) return

    fetchCourses(user.id).then((data) => {
      setCourseData(data)
    })

    return () => {}
  }, [user])

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

import { CourseInfoCard } from '@/components/Course/CourseInfoCard'
import { EnrollNewCourse } from '@/components/Course/EnrollNewCourse'
import { useUser } from '@/hooks/useUser'
import { MainLayout } from '@/layout/MainLayout'
import { useFetchStudentCourses } from '@/service/courseService'
import { Flex } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function CoursesPage() {
  const { user, loading } = useUser()
  const router = useRouter()

  const { data } = useFetchStudentCourses()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in')
    }
  }, [user, loading])

  if (user) {
    return (
      <MainLayout>
        <Flex wrap="wrap" gap="md" p={10}>
          {data?.map((course) => (
            <CourseInfoCard key={course.id} {...course} />
          ))}
        </Flex>
        <EnrollNewCourse />
      </MainLayout>
    )
  }
}

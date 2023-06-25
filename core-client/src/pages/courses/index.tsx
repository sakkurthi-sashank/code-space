import { CourseCard } from '@/components/courses/CourseCard'
import { backendUrl } from '@/constants'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { Flex } from '@mantine/core'
import { useQuery } from 'react-query'

interface Course {
  id: string
  courseName: string
  courseDescription: string
  professorName: string
  Learningtags: string[]
  courseStartDate: string
  courseEndDate: string
  Studentprogress: number
  courseValidity: number
}

export default function CoursesPage() {
  const { isLoading, error, data } = useQuery(
    'courses',
    async () =>
      await fetch(`${backendUrl}/courses/get-all-courses-by-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: '3534ffca-1341-11ee-be56-0242ac120002',
        }),
      }).then((res) => res.json()),
  )

  return (
    <DashboardLayout>
      {isLoading && <div>Loading...</div>}
      <Flex wrap="wrap" gap="md" p={'md'}>
        {data?.courses.map((course: Course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </Flex>
    </DashboardLayout>
  )
}

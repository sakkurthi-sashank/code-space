import { courseAPI } from '@/api/course-api'
import { CourseCard } from '@/components/courses/CourseCard'
import { ICourse } from '@/interface/course'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { Flex } from '@mantine/core'

export default function CoursesPage() {
  const studentId = 'bd06b333-d9d1-4390-97a3-a66cf57a2405'
  const { isLoading, data } = courseAPI(studentId)

  return (
    <DashboardLayout>
      {isLoading && <div>Loading...</div>}
      <Flex wrap="wrap" gap="md" p={'md'}>
        {data?.map((course: ICourse) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </Flex>
    </DashboardLayout>
  )
}

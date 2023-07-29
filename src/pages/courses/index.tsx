import { CourseCards } from '@/components/Student/Course/CourseCards'
import { EnrollToCourse } from '@/components/Student/Course/EnrollToCourse'
import { Dashboard } from '@/components/common/Dashboard'
import { Flex } from '@mantine/core'

export default function CoursesPage() {
  return (
    <>
      <Dashboard>
        <Flex className="flex-wrap p-4 gap-4">
          <CourseCards />
        </Flex>
        <EnrollToCourse />
      </Dashboard>
    </>
  )
}

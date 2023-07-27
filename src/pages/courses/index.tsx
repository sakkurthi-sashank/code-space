import { CourseCards } from '@/components/Student/Course/CourseCards'
import { EnrollToCourse } from '@/components/Student/Course/EnrollToCourse'
import { Dashboard } from '@/components/Student/Dashboard'
import { AuthUserWrapper } from '@/components/common/AuthUserWrapper'
import { Flex } from '@mantine/core'

export default function CoursesPage() {
  return (
    <AuthUserWrapper>
      <Dashboard>
        <Flex className="flex-wrap p-4 gap-4">
          <CourseCards />
        </Flex>
        <EnrollToCourse />
      </Dashboard>
    </AuthUserWrapper>
  )
}

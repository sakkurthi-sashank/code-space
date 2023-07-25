import { CourseCards } from '@/components/Student/Course/CourseCards'
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
      </Dashboard>
    </AuthUserWrapper>
  )
}

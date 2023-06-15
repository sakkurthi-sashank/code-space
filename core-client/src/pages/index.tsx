import CourseCard from '@/components/courses/CourseCard'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Flex } from '@mantine/core'

export default function HomePage() {
  return (
    <DashboardLayout>
      <Flex wrap="wrap" gap="md">
        <CourseCard />
      </Flex>
    </DashboardLayout>
  )
}

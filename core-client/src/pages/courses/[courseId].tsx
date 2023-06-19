import { CourseContentCard } from '@/components/courses/course-content-card'
import { CourseFilter } from '@/components/courses/course-filter'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { Stack, useMantineTheme } from '@mantine/core'

export default function CoursePage() {
  const theme = useMantineTheme()

  return (
    <DashboardLayout>
      <Stack spacing={0}>
        <CourseFilter />
        <div className="p-2">
          <CourseContentCard />
        </div>
      </Stack>
    </DashboardLayout>
  )
}

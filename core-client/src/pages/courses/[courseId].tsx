import { CourseContentCard } from '@/components/courses/CourseContentCard'
import { CourseContentFilter } from '@/components/courses/CourseContentFilter'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { Stack, useMantineTheme } from '@mantine/core'

const assignment = [
  {
    id: '1',
    assignmentName: 'Introduction to Java Programming',
    startDate: '2023-06-01',
    endDate: '2023-06-31',
  },
]

export default function CoursePage() {
  const theme = useMantineTheme()

  return (
    <DashboardLayout>
      <Stack spacing={0}>
        <CourseContentFilter />
        <div className="space-y-2 p-2">
          {assignment.map((assignment) => (
            <CourseContentCard key={assignment.id} {...assignment} />
          ))}
        </div>
      </Stack>
    </DashboardLayout>
  )
}

import { CourseDisplayCard } from '@/components/courses/course-display-card'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Flex } from '@mantine/core'

const courses = [
  {
    id: '1234455566667',
    title: 'Data Structures and Algorithms',
    description: 'Odd semester 2023',
    professor: 'Amith Kumar Mandal',
    tags: ['Data Structures', 'Algorithms', 'C++'],
    startDate: '2021-08-01',
    endDate: '2021-12-01',
    progress: 10,
    validity: 40,
  },
]

export default function CoursesPage() {
  return (
    <DashboardLayout>
      <Flex wrap="wrap" gap="md" p={'md'}>
        {courses.map((course) => (
          <CourseDisplayCard key={course.id} {...course} />
        ))}
      </Flex>
    </DashboardLayout>
  )
}

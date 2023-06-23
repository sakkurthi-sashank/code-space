import { CourseCard } from '@/components/courses/CourseCard'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { Flex } from '@mantine/core'

const courses = [
  {
    id: '1',
    courseName: 'Java Programming',
    courseDescription: 'Odd semester 2021',
    professorName: 'Dr. John Doe',
    Learningtags: ['Java', 'Programming', 'OOP'],
    courseStartDate: '2021-08-01',
    courseEndDate: '2021-12-31',
    Studentprogress: 30,
    courseValidity: 50,
  },
]

export default function CoursesPage() {
  return (
    <DashboardLayout>
      <Flex wrap="wrap" gap="md" p={'md'}>
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </Flex>
    </DashboardLayout>
  )
}

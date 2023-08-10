import { Dashboard } from '@/components/common/Dashboard'
import { CourseCards } from '@/components/student/Course/CourseCards'
import { EnrollToCourse } from '@/components/student/Course/EnrollToCourse'

export default function StudentCoursesPage() {
  return (
    <Dashboard>
      <CourseCards />
      <EnrollToCourse />
    </Dashboard>
  )
}

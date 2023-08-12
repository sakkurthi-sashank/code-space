import { Dashboard } from '@/components/common/Dashboard'
import { CourseCards } from '@/components/Student/Course/CourseCards'
import { EnrollToCourse } from '@/components/Student/Course/EnrollToCourse'

export default function StudentCoursesPage() {
  return (
    <Dashboard>
      <CourseCards />
      <EnrollToCourse />
    </Dashboard>
  )
}

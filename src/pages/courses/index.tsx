import { Dashboard } from '@/components/common/dashboard'
import { CourseCards } from '@/components/user/course/CourseCards'
import { CourseEnrollment } from '@/components/user/course/CourseEnrollment'

export default function StudentCoursesPage() {
  return (
    <Dashboard>
      <CourseCards />
      <CourseEnrollment />
    </Dashboard>
  )
}

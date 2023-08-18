import { Dashboard } from '@/components/common/dashboard'
import { CourseEnrollment } from '@/components/user/course/CourseEnrollment'
import { CoursePreviewCards } from '@/components/user/course/CoursePreviewCards'

export default function StudentCoursesPage() {
  return (
    <Dashboard>
      <CoursePreviewCards />
      <CourseEnrollment />
    </Dashboard>
  )
}

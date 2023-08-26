import { AuthMiddleware } from '@/components/admin/AuthMiddleware'
import { CourseHeader } from '@/components/admin/course/CourseHeader'
import { ShowAllCourses } from '@/components/admin/course/ShowAllCourses'
import { Dashboard } from '@/components/common/dashboard'

export default function AdminCourses() {
  return (
    <AuthMiddleware>
      <Dashboard>
        <CourseHeader />
        <ShowAllCourses />
      </Dashboard>
    </AuthMiddleware>
  )
}

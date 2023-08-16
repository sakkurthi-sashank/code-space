import { AuthMiddleware } from '@/components/admin/AuthMiddleware'
import { AllCourses } from '@/components/admin/course/AllCourses'
import { AddCourse } from '@/components/admin/course/CreateCourse'
import { Dashboard } from '@/components/common/dashboard'

export default function AdminCourses() {
  return (
    <AuthMiddleware>
      <Dashboard>
        <div className="flex justify-end p-2">
          <AddCourse />
        </div>
        <AllCourses />
      </Dashboard>
    </AuthMiddleware>
  )
}

import { AuthMiddleware } from '@/components/admin/AuthMiddleware'
import { AllCoursesModule } from '@/components/admin/course-module/AllCoursesModule'
import { AddCourseModule } from '@/components/admin/course-module/CreateCourseModule'
import { Dashboard } from '@/components/common/dashboard'
import { useRouter } from 'next/router'

export default function AdminModulePage() {
  const { courseId } = useRouter().query

  return (
    <AuthMiddleware>
      <Dashboard>
        <div className="flex justify-end p-2">
          <AddCourseModule courseId={courseId as string} />
        </div>
        <AllCoursesModule courseId={courseId as string} />
      </Dashboard>
    </AuthMiddleware>
  )
}

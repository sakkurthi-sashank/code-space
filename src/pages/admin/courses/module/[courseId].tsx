import { AuthMiddleware } from '@/components/admin/AuthMiddleware'
import { AddCourseModule } from '@/components/admin/course-module/CreateCourseModule'
import { ShowAllCoursesModule } from '@/components/admin/course-module/ShowAllCoursesModule'
import { Dashboard } from '@/components/common/dashboard'
import { useRouter } from 'next/router'

export default function AdminModulePage() {
  const { courseId } = useRouter().query

  return (
    <AuthMiddleware>
      <Dashboard>
        <div className="flex justify-end items-center p-2.5 border-b rounded bg-white">
          <AddCourseModule courseId={courseId as string} />
        </div>
        <ShowAllCoursesModule courseId={courseId as string} />
      </Dashboard>
    </AuthMiddleware>
  )
}

import { AllCoursesModule } from '@/components/admin/CourseModule/AllCoursesModule'
import { AddCourseModule } from '@/components/admin/CourseModule/CreateCourseModule'
import { AuthAdminWrapper } from '@/components/common/AuthAdminWrapper'
import { Dashboard } from '@/components/common/Dashboard'
import { useRouter } from 'next/router'

export default function AdminModulePage() {
  const { courseId } = useRouter().query

  return (
    <AuthAdminWrapper>
      <Dashboard>
        <div className="flex justify-end p-2">
          <AddCourseModule courseId={courseId as string} />
        </div>
        <AllCoursesModule courseId={courseId as string} />
      </Dashboard>
    </AuthAdminWrapper>
  )
}

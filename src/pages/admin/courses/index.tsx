import { AllCourses } from '@/components/Admin/Course/AllCourses'
import { AddCourse } from '@/components/Admin/Course/CreateCourse'
import { AuthAdminWrapper } from '@/components/common/AuthAdminWrapper'
import { Dashboard } from '@/components/common/Dashboard'

export default function AdminCourses() {
  return (
    <AuthAdminWrapper>
      <Dashboard>
        <div className="flex justify-end p-2">
          <AddCourse />
        </div>
        <AllCourses />
      </Dashboard>
    </AuthAdminWrapper>
  )
}

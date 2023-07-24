import { AddStudent } from '@/components/Admin/Students/AddStudent'
import { AllStudents } from '@/components/Admin/Students/AllStudents'
import { Dashboard } from '@/components/Student/Dashboard'
import { AuthAdminWrapper } from '@/components/common/AuthAdminWrapper'

export default function index() {
  return (
    <AuthAdminWrapper>
      <Dashboard>
        <AddStudent />
        <div className="flex p-3 mx-3 bg-white justify-between items-center">
          <AllStudents />
        </div>
      </Dashboard>
    </AuthAdminWrapper>
  )
}

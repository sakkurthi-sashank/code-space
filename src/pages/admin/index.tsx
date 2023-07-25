import { AddProfile } from '@/components/Admin/Profile/AddProfile'
import { AllProfiles } from '@/components/Admin/Profile/AllProfiles'
import { Dashboard } from '@/components/Student/Dashboard'
import { AuthAdminWrapper } from '@/components/common/AuthAdminWrapper'

export default function index() {
  return (
    <AuthAdminWrapper>
      <Dashboard>
        <AddProfile />
        <AllProfiles />
      </Dashboard>
    </AuthAdminWrapper>
  )
}

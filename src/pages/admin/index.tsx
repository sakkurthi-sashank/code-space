import { AddProfile } from '@/components/Admin/Profile/AddProfile'
import { AllProfiles } from '@/components/Admin/Profile/AllProfiles'
import { AuthAdminWrapper } from '@/components/common/AuthAdminWrapper'
import { Dashboard } from '@/components/common/Dashboard'

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

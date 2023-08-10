import { AllProfiles } from '@/components/admin/Profile/AllProfiles'
import { CreateProfile } from '@/components/admin/Profile/CreateProfile'
import { AuthAdminWrapper } from '@/components/common/AuthAdminWrapper'
import { Dashboard } from '@/components/common/Dashboard'

export default function index() {
  return (
    <AuthAdminWrapper>
      <Dashboard>
        <CreateProfile />
        <AllProfiles />
      </Dashboard>
    </AuthAdminWrapper>
  )
}

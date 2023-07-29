import { AllProfiles } from '@/components/Admin/Profile/AllProfiles'
import { CreateProfile } from '@/components/Admin/Profile/CreateProfile'
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

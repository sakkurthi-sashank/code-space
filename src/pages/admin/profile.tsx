import { AuthMiddleware } from '@/components/admin/AuthMiddleware'
import { AllUsers } from '@/components/admin/user/AllUsers'
import { CreateUser } from '@/components/admin/user/CreateUser'
import { Dashboard } from '@/components/common/dashboard'

export default function index() {
  return (
    <AuthMiddleware>
      <Dashboard>
        <CreateUser />
        <AllUsers />
      </Dashboard>
    </AuthMiddleware>
  )
}

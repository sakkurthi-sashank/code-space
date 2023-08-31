import { AuthMiddleware } from '@/components/admin/AuthMiddleware'
import { AllUsers } from '@/components/admin/user/AllUsers'
import { CreateUser } from '@/components/admin/user/CreateUser'
import { Dashboard } from '@/components/common/dashboard'

export default function index() {
  return (
    <AuthMiddleware>
      <Dashboard>
        <div className="flex justify-end items-center p-2.5 border-b rounded bg-white">
          <CreateUser />
        </div>
        <AllUsers />
      </Dashboard>
    </AuthMiddleware>
  )
}

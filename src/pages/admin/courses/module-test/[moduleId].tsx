import { AllModuleTest } from '@/components/admin/ModuleTest/AllQuestions'
import { AuthAdminWrapper } from '@/components/common/AuthAdminWrapper'
import { Dashboard } from '@/components/common/Dashboard'
import { useRouter } from 'next/router'

export default function AdminModuleTestPage() {
  const router = useRouter()

  const { moduleId } = router.query

  return (
    <AuthAdminWrapper>
      <Dashboard>
        <div className="flex justify-end p-2"></div>
        <AllModuleTest moduleId={moduleId as string} />
      </Dashboard>
    </AuthAdminWrapper>
  )
}

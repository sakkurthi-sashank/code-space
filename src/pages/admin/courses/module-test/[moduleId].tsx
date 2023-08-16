import { AuthMiddleware } from '@/components/admin/AuthMiddleware'
import { AllCodingQuestions } from '@/components/admin/module-test/AllQuestions'
import { CreateQuestion } from '@/components/admin/module-test/CreateQuestion'
import { Dashboard } from '@/components/common/dashboard'
import { useRouter } from 'next/router'

export default function AdminModuleTestPage() {
  const router = useRouter()

  const { moduleId } = router.query

  return (
    <AuthMiddleware>
      <Dashboard>
        <div className="flex justify-end p-2">
          <CreateQuestion moduleId={moduleId as string} />
        </div>
        <AllCodingQuestions />
      </Dashboard>
    </AuthMiddleware>
  )
}

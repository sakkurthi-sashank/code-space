import { AuthMiddleware } from '@/components/admin/AuthMiddleware'
import { CreateQuestion } from '@/components/admin/module-test/CreateQuestion'
import { AllCodingQuestions } from '@/components/admin/module-test/ShowAllQuestions'
import { Dashboard } from '@/components/common/dashboard'
import { useRouter } from 'next/router'

export default function AdminModuleTestPage() {
  const router = useRouter()

  const { moduleId } = router.query

  return (
    <AuthMiddleware>
      <Dashboard>
        <div className="flex justify-end items-center p-2.5 border-b rounded bg-white">
          <CreateQuestion moduleId={moduleId as string} />
        </div>
        <AllCodingQuestions moduleId={moduleId as string} />
      </Dashboard>
    </AuthMiddleware>
  )
}

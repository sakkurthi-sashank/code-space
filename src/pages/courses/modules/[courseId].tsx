import { Dashboard } from '@/components/common/dashboard'
import { Header } from '@/components/user/module/Header'
import { ModuleCards } from '@/components/user/module/ModuleCards'
import { useRouter } from 'next/router'

export default function ModulePage() {
  const router = useRouter()
  const { courseId } = router.query

  return (
    <Dashboard>
      <Header />
      <ModuleCards courseId={courseId as string} />
    </Dashboard>
  )
}

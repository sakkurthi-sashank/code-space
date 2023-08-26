import ModuleTest from '@/components/user/module-test'
import { useRouter } from 'next/router'

export default function ModuleTestPage() {
  const router = useRouter()
  const { moduleId } = router.query

  return <ModuleTest moduleId={moduleId as string} />
}

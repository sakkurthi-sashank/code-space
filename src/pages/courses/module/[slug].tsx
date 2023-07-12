import { MainLayout } from '@/layouts/MainLayout'
import { ModuleLayout } from '@/layouts/ModuleLayout'
import { useRouter } from 'next/router'

export default function ModulePage() {
  const router = useRouter()

  return (
    <MainLayout>
      <ModuleLayout courseId={router.query.slug as string} />
    </MainLayout>
  )
}

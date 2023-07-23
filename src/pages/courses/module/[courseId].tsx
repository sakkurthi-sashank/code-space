import { ModuleHeader } from '@/components/CourseModule/ModuleHeader'
import { ModuleInfoCompleteDetails } from '@/components/CourseModule/ModuleInfoCompleteDetails'
import { ModulesInfoPreviewPanel } from '@/components/CourseModule/ModulesInfoPreviewPanel'
import { useAuth } from '@/hooks/useAuth'
import { MainLayout } from '@/layouts/MainLayout'
import { Divider, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function ModulePage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  const { courseId } = router.query

  const [currentUserSelectedModuleId, setUserSelectedModuleId] = useState<
    string | null
  >(null)

  const theme = useMantineTheme()

  if (!user && !loading) {
    router.push('/login')
    return null
  }

  if (user) {
    return (
      <MainLayout>
        <ModuleHeader courseId={courseId as string} />
        <div className="h-full w-full flex bg-white">
          <div className="w-1/2">
            <ModulesInfoPreviewPanel
              courseId={courseId as string}
              userId={user?.id}
              setUserSelectedModuleId={setUserSelectedModuleId}
            />
          </div>
          <Divider orientation="vertical" color={theme.colors.gray[2]} />
          <div className="w-1/2">
            <ModuleInfoCompleteDetails
              currentUserSelectedModuleId={currentUserSelectedModuleId}
            />
          </div>
        </div>
      </MainLayout>
    )
  }

  return null
}

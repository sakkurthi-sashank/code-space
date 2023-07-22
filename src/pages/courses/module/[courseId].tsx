import { ModuleHeader } from '@/components/CourseModule/ModuleHeader'
import { ModuleInfoCardFullDetails } from '@/components/CourseModule/ModuleInfoCardFullDetails'
import { ModuleInfoCards } from '@/components/CourseModule/ModuleInfoCards'
import { useUserAuth } from '@/hooks/userAuthContext'
import { MainLayout } from '@/layouts/MainLayout'
import { Divider, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function ModulePage() {
  const router = useRouter()
  const { user, loading } = useUserAuth()

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
            <ModuleInfoCards
              courseId={courseId as string}
              userId={user?.id}
              setUserSelectedModuleId={setUserSelectedModuleId}
            />
          </div>
          <Divider orientation="vertical" color={theme.colors.gray[2]} />
          <div className="w-1/2">
            <ModuleInfoCardFullDetails
              currentUserSelectedModuleId={currentUserSelectedModuleId}
            />
          </div>
        </div>
      </MainLayout>
    )
  }

  return null
}

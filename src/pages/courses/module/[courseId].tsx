import { InfoCardFullDetails } from '@/components/CourseModule/InfoCardFullDetails'
import { ModuleHeader } from '@/components/CourseModule/ModuleHeader'
import { ModuleInfoCards } from '@/components/CourseModule/ModuleInfoCards'
import { MainLayout } from '@/layouts/MainLayout'
import { Divider, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'

export default function ModulePage() {
  const router = useRouter()
  const { courseId } = router.query

  const theme = useMantineTheme()

  return (
    <MainLayout>
      <ModuleHeader courseId={courseId as string} />
      <div className="h-full w-full flex bg-white">
        <div className="w-1/2">
          <ModuleInfoCards courseId={courseId as string} />
        </div>
        <Divider orientation="vertical" color={theme.colors.gray[2]} />
        <div className="w-1/2">
          <InfoCardFullDetails />
        </div>
      </div>
    </MainLayout>
  )
}

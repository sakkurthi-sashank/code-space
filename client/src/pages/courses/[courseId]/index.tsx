import { ModuleFilter } from '@/components/CourseModule/module-filter'
import { ModuleInfoCards } from '@/components/CourseModule/module-info-cards'
import { MainLayout } from '@/layout/main-layout'
import { Stack, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'

export default function CourseModulesPage() {
  const theme = useMantineTheme()
  const router = useRouter()

  const courseId = router.query.courseId as string

  return (
    <MainLayout>
      <Stack spacing={0} className="h-full w-full">
        <ModuleFilter />
        <ModuleInfoCards courseId={courseId} />
      </Stack>
    </MainLayout>
  )
}

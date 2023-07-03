import { ModuleDisplayCards } from '@/components/course-module/module-display-cards'
import { ModuleFilter } from '@/components/course-module/modules-filter'
import { MainLayout } from '@/layout/main-layout'
import { Stack, useMantineTheme } from '@mantine/core'

export default function CourseModulesPage() {
  const theme = useMantineTheme()

  return (
    <MainLayout>
      <Stack spacing={0} className="h-full w-full">
        <ModuleFilter />
        <ModuleDisplayCards />
      </Stack>
    </MainLayout>
  )
}

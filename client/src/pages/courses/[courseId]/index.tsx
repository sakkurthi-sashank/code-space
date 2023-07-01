import { ModuleFilter } from '@/components/course-module/modules-filter'
import { CourseModuleLayout } from '@/layout/course-module-layout'
import { MainLayout } from '@/layout/main-layout'
import { Stack, useMantineTheme } from '@mantine/core'

export default function CourseModulesPage() {
  const theme = useMantineTheme()
  return (
    <MainLayout>
      <Stack spacing={0} className="h-full w-full">
        <ModuleFilter />
        <CourseModuleLayout />
      </Stack>
    </MainLayout>
  )
}

import { ModuleInfoCards } from '@/components/CourseModule/module-info-cards'
import { MainLayout } from '@/layout/main-layout'
import { Stack, useMantineTheme } from '@mantine/core'

export default function CourseModulesPage() {
  const theme = useMantineTheme()

  return (
    <MainLayout>
      <Stack spacing={0} className="h-full w-full">
        <ModuleInfoCards />
      </Stack>
    </MainLayout>
  )
}

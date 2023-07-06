import { ModuleDisplayCards } from '@/components/CourseModule/ModuleCards'
import { ModuleFilter } from '@/components/CourseModule/ModuleFilter'
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

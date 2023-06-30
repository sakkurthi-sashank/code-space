import { CourseModuleFilter } from '@/components/course/course-module-filter'
import { MainLayout } from '@/layout/main-layout'
import { Box, Divider, Stack, useMantineTheme } from '@mantine/core'

export default function CourseModulesPage() {
  const theme = useMantineTheme()
  return (
    <MainLayout>
      <Stack spacing={0} className="h-full w-full">
        <CourseModuleFilter />
        <Box className="flex h-full w-full bg-white">
          <Box className="h-full w-full"></Box>
          <Divider
            color={theme.colors.gray[2]}
            className="h-full"
            orientation="vertical"
          />
          <Box className="hidden h-full w-full md:block"></Box>
        </Box>
      </Stack>
    </MainLayout>
  )
}

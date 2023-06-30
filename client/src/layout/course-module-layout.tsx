import { Box, Divider, useMantineTheme } from '@mantine/core'

export const CourseModuleLayout = () => {
  const theme = useMantineTheme()
  return (
    <Box className="flex h-full w-full bg-white">
      <Box className="h-full w-full"></Box>
      <Divider
        color={theme.colors.gray[2]}
        className="h-full"
        orientation="vertical"
      />
      <Box className="hidden h-full w-full md:block"></Box>
    </Box>
  )
}

import { Box, useMantineTheme } from '@mantine/core'

export const CourseFilter = () => {
  const theme = useMantineTheme()
  return (
    <Box
      sx={{
        height: 50,
        backgroundColor: 'white',
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
      }}
    ></Box>
  )
}

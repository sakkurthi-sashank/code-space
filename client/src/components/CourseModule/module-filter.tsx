import { Box, useMantineTheme } from '@mantine/core'

export const ModuleFilter = () => {
  const theme = useMantineTheme()
  return (
    <Box
      px={'md'}
      sx={{
        height: 50,
        backgroundColor: 'white',
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        gap: '10px',
      }}
    ></Box>
  )
}

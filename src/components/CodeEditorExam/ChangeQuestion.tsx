import { Paper, useMantineTheme } from '@mantine/core'

export const ChangeQuestion = () => {
  const theme = useMantineTheme()
  return (
    <Paper
      bg={'white'}
      h={'10vh'}
      sx={{
        border: `1px solid ${theme.colors.gray[2]}`,
      }}
      radius={'md'}
    ></Paper>
  )
}

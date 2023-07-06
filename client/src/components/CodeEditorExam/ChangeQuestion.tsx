import { Paper, useMantineTheme } from '@mantine/core'

export const ChangeQuestion = () => {
  const theme = useMantineTheme()
  return (
    <Paper
      bg={'white'}
      h={'7vh'}
      sx={{
        border: `1px solid ${theme.colors.gray[1]}`,
      }}
      radius={'md'}
    ></Paper>
  )
}

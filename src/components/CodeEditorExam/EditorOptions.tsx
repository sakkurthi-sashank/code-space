import { Paper, useMantineTheme } from '@mantine/core'

export const EditorOptions = () => {
  const theme = useMantineTheme()

  return (
    <Paper
      h={'7vh'}
      radius={'md'}
      sx={{
        border: `1px solid ${theme.colors.gray[2]}`,
      }}
    ></Paper>
  )
}

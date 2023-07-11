import { Button, Paper, useMantineTheme } from '@mantine/core'

export const CompileAndSubmit = () => {
  const theme = useMantineTheme()

  return (
    <Paper
      h={60}
      radius={'md'}
      sx={{
        border: `1px solid ${theme.colors.gray[2]}`,
      }}
      className="flex w-full items-center justify-end space-x-6 bg-white px-6"
    >
      <Button size="xs" radius={'sm'} fw={500} variant="outline">
        Run
      </Button>
      <Button size="xs" radius={'sm'} fw={500}>
        Submit
      </Button>
    </Paper>
  )
}

import { Paper, Tabs, Textarea, useMantineTheme } from '@mantine/core'

export const TestCases = () => {
  const theme = useMantineTheme()
  return (
    <Paper
      h={'40vh'}
      bg={'white'}
      radius={'sm'}
      sx={{
        border: `1px solid ${theme.colors.gray[2]}`,
      }}
    >
      <Tabs defaultValue={'test-cases'} className="h-full">
        <Tabs.List grow h={45}>
          <Tabs.Tab value="test-cases">Test Cases</Tabs.Tab>
          <Tabs.Tab value="submission">Submission</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="test-cases" p={'sm'}>
          <Textarea
            size="sm"
            className="font-mono text-gray-600"
            autosize
            description="Enter Your Custom Input"
          />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  )
}

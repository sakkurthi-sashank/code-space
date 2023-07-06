import { ScrollArea, Tabs, Textarea, useMantineTheme } from '@mantine/core'

export const TestCase = () => {
  const theme = useMantineTheme()
  return (
    <ScrollArea
      h={'40vh'}
      className="rounded-md bg-white"
      sx={{
        borderTop: `1px solid ${theme.colors.gray[2]}`,
      }}
    >
      <Tabs defaultValue={'test-cases'} className="h-full">
        <Tabs.List grow h={45}>
          <Tabs.Tab value="test-cases">Test Cases</Tabs.Tab>
          <Tabs.Tab value="submission">Submission</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="test-cases">
          <div className="p-4">
            <Textarea
              size="sm"
              className="font-mono text-gray-600"
              autosize
              description="Enter Your Custom Input"
            />
            <div className="w-full">
              <div className="p-2 font-mono text-sm text-gray-600">Output</div>
              <div className="h-full min-h-[100px] w-full rounded-md bg-gray-100">
                <div className="p-2 font-mono text-xs text-gray-700">
                  {/* {atob(outputDetails)} */}
                </div>
              </div>
            </div>
          </div>
        </Tabs.Panel>
      </Tabs>
    </ScrollArea>
  )
}

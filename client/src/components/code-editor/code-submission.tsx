import { Button, Header, ScrollArea, Tabs, Textarea } from '@mantine/core'

export const CodeSubmission = () => {
  return (
    <div className="relative h-72 space-y-2">
      <ScrollArea h={240} className="rounded-md bg-white">
        <Tabs defaultValue={'test-cases'} className="h-full">
          <Tabs.List grow h={40}>
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
            </div>
          </Tabs.Panel>
        </Tabs>
      </ScrollArea>
      <Header
        height={50}
        className="flex w-full items-center justify-end space-x-6 rounded-md px-6"
      >
        <Button size="xs" radius={'sm'} fw={500} variant="outline">
          Run
        </Button>
        <Button size="xs" radius={'sm'} fw={500}>
          Submit
        </Button>
      </Header>
    </div>
  )
}

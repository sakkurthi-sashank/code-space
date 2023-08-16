import { Tabs } from '@mantine/core'

export const DisplayTestCase = () => {
  return (
    <Tabs
      className="h-full border-b border-gray-200"
      defaultValue="sample-test-case"
    >
      <Tabs.List h={45} grow>
        <Tabs.Tab value="sample-test-case">Sample Test Case</Tabs.Tab>
        <Tabs.Tab value="hidden-test-case">Test Case</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  )
}

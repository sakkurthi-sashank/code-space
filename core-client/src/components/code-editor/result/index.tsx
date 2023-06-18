import { Tabs } from '@mantine/core'

export const Result = () => {
  return (
    <Tabs defaultValue={'output'}>
      <Tabs.List h={45} grow>
        <Tabs.Tab value="custom-output">Custom Output</Tabs.Tab>
        <Tabs.Tab value="output">Output</Tabs.Tab>
        <Tabs.Tab value="test-case">Test Case</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="custom-output">{}</Tabs.Panel>
      <Tabs.Panel value="output">{}</Tabs.Panel>
      <Tabs.Panel value="test-case">{}</Tabs.Panel>
    </Tabs>
  )
}

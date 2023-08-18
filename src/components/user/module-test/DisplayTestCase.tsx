import { TestCase } from '@/types/databaseExtractTypes.ts'
import { Accordion, ScrollArea, Tabs } from '@mantine/core'

export const DisplayTestCase = ({ testCase }: { testCase: TestCase[] }) => {
  return (
    <Tabs
      className="h-full border-b border-gray-200"
      defaultValue="sample-test-case"
    >
      <Tabs.List h={45} grow>
        <Tabs.Tab value="sample-test-case">Sample Test Case</Tabs.Tab>
        <Tabs.Tab value="hidden-test-case">Test Case</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="sample-test-case">
        <ScrollArea className="h-[calc(50vh-145px)] p-2.5" type="never">
          <Accordion radius="lg" variant="separated">
            {testCase.map((test, index) => {
              return (
                test.is_sample === true && (
                  <Accordion.Item key={index} value={test.input!}>
                    <Accordion.Control>Test Case {index + 1}</Accordion.Control>
                    <Accordion.Panel>
                      <pre className="font-mono rounded-md text-sm text-gray-600 font-normal antialiased bg-gray-100 px-3 py-2">
                        {test.input}
                      </pre>
                    </Accordion.Panel>
                  </Accordion.Item>
                )
              )
            })}
          </Accordion>
        </ScrollArea>
      </Tabs.Panel>
      <Tabs.Panel value="hidden-test-case">{}</Tabs.Panel>
    </Tabs>
  )
}

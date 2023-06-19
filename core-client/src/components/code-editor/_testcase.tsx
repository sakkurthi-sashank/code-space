import { Accordion, Code, ThemeIcon } from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react'

interface TestCaseProps {
  testcases: {
    testcaseId: string
    iserror: boolean
    testcaseName: string
    compilerMessage: string
    outputMessage: string
    expectedOutput: string
  }[]
}

export const TestCase = ({ testcases }: TestCaseProps) => {
  return (
    <div>
      <Accordion variant="contained" multiple>
        {testcases.map((testcase) => (
          <Accordion.Item value={testcase.testcaseId} key={testcase.testcaseId}>
            <Accordion.Control
              className="bg-white hover:bg-white"
              icon={
                <ThemeIcon
                  radius="xl"
                  size={'sm'}
                  variant="light"
                  color="green"
                >
                  <IconCircleCheck size={14} />
                </ThemeIcon>
              }
            >
              {testcase.testcaseName}
            </Accordion.Control>
            <Accordion.Panel className="bg-white hover:bg-white">
              <div>
                <span className="font-mono text-sm">
                  Compiler Message:
                  <Code block mt={6}>
                    {testcase.compilerMessage}
                  </Code>
                </span>
                <span className="font-mono text-sm">
                  Output Message:
                  <Code mt={6} block>
                    {testcase.outputMessage}
                  </Code>
                </span>
                <span className="font-mono text-sm">
                  Expected Output:
                  <Code block mt={6}>
                    {testcase.expectedOutput}
                  </Code>
                </span>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

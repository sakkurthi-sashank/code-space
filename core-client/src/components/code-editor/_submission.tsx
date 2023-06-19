import { Button } from '@mantine/core'
import { TestCase } from './_testcase'

const testcases = [
  {
    testcaseId: '1',
    iserror: false,
    testcaseName: 'Testcase 1',
    compilerMessage: 'Successfully Compilation',
    outputMessage: 'Hello World',
    expectedOutput: 'Hello World',
  },
]

export const Submission = () => {
  return (
    <div className="w-full">
      <div className="flex w-full justify-end space-x-6 py-4">
        <Button radius={'sm'} fw={500} variant="outline">
          Run
        </Button>
        <Button radius={'sm'} fw={500}>
          Submit
        </Button>
      </div>
      <TestCase testcases={testcases} />
    </div>
  )
}

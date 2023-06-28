import { Textarea } from '@mantine/core'

export const TestCases = () => {
  return (
    <div className="p-4">
      <Textarea
        size="sm"
        className="font-mono text-gray-600"
        autosize
        description="Enter Your Custom Input"
      />
    </div>
  )
}

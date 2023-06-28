import { Divider, ScrollArea, useMantineTheme } from '@mantine/core'

export const DisplayQuestion = () => {
  const theme = useMantineTheme()
  return (
    <div className="rounded-md bg-white">
      <ScrollArea h={700}>
        <div className="prose prose-sm max-w-none px-6 py-4">
          <h4 className="py-2">Two Sum</h4>
          <Divider color={theme.colors.gray[2]} />
          <p>
            Given an array of integers nums and an integer target, return
            indices of the two numbers such that they add up to target.
            <br />
            You may assume that each input would have exactly one solution, and
            you may not use the same element twice.
            <br />
            You can return the answer in any order.
          </p>
          <h4>Input Format:</h4>
          <p>
            First line of input contains number of elements in array. Next line
            contains array elements. Last line contains target.
          </p>
          <h4>Output Format:</h4>
          <p>
            For each testcase, in a new line, print the indices of two numbers
            such that they add up to target.
          </p>
          <h4>Sample Input 1 :</h4>
          <pre className="rounded-md bg-gray-100 px-4 py-3 font-mono text-sm text-gray-800">
            4
            <br />
            2 7 11 15
            <br />9
          </pre>
          <h4>Sample Output 1 :</h4>
          <pre className="rounded-md bg-gray-100 px-4 py-3 font-mono text-sm text-gray-800">
            0 1
          </pre>
          <h4>Sample Input 2 :</h4>
          <pre className="rounded-md bg-gray-100 px-4 py-3 font-mono text-sm text-gray-800">
            3
            <br />
            3 2 4
            <br />6
          </pre>
          <h4>Sample Output 2 :</h4>
          <pre className="rounded-md bg-gray-100 px-4 py-3 font-mono text-sm text-gray-800">
            1 2
          </pre>
        </div>
      </ScrollArea>
    </div>
  )
}

import { CodingQuestion, TestCase } from '@/types/databaseExtractTypes.ts'
import { Stack, Text, Title, useMantineTheme } from '@mantine/core'

export function QuestionPanel({
  currentQuestion,
}: {
  currentQuestion: CodingQuestion & { test_case: TestCase[] }
}) {
  const theme = useMantineTheme()

  return (
    <Stack spacing={'xs'}>
      <Title order={4} fw={600}>
        {currentQuestion?.problem_name}
      </Title>
      <Text size={'sm'} color={theme.colors.gray[7]}>
        {currentQuestion?.problem_statement?.split('\n').map((text, index) => (
          <span key={index}>
            {text}
            <br />
          </span>
        ))}
      </Text>

      {currentQuestion?.input_format && (
        <Text size={'sm'} color={theme.colors.gray[7]}>
          <span className="font-medium text-gray-800">Input Format:</span>{' '}
          <br />
          {currentQuestion?.input_format}
        </Text>
      )}

      {currentQuestion?.output_format && (
        <Text size={'sm'} color={theme.colors.gray[7]}>
          <span className="font-medium text-gray-800">Output Format:</span>{' '}
          <br />
          {currentQuestion?.output_format}
        </Text>
      )}
      {currentQuestion?.test_case.map((testCase, index) => (
        <div key={testCase.id}>
          {testCase.is_sample === true ? (
            <div key={testCase.id}>
              <Text size={'sm'} weight={500}>
                Sample Input {index + 1} :
              </Text>
              <pre className="font-mono text-sm text-gray-600 font-normal antialiased bg-gray-100 px-3 py-2 rounded-sm">
                {testCase.input}
              </pre>
              <Text size={'sm'} weight={500}>
                Sample Output {index + 1} :
              </Text>
              <pre className="font-mono text-sm text-gray-600 font-normal antialiased bg-gray-100 px-3 py-2 rounded-sm">
                {testCase.output}
              </pre>
            </div>
          ) : null}
        </div>
      ))}
    </Stack>
  )
}

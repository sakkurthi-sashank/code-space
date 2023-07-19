import { useTestStore } from '@/store/TestStore'
import { ScrollArea, Stack, Text, Title, useMantineTheme } from '@mantine/core'

export const QuestionPanel = () => {
  const theme = useMantineTheme()

  const { codingQuestionOnUserSelectedId } = useTestStore((state) => ({
    codingQuestionOnUserSelectedId: state.codingQuestionOnUserSelectedId,
  }))

  return (
    <ScrollArea
      sx={{
        borderRadius: '4px',
        border: `1px solid ${theme.colors.gray[2]}`,
      }}
      h={'84vh'}
      type="never"
      p={'sm'}
    >
      <Stack spacing={'xs'} p={'md'}>
        <Title order={4} fw={600}>
          {codingQuestionOnUserSelectedId?.problem_name}
        </Title>
        <Text size={'sm'} color={theme.colors.gray[7]}>
          {codingQuestionOnUserSelectedId?.problem_statement
            ?.split('\n')
            .map((text, index) => (
              <span key={index}>
                {text}
                <br />
              </span>
            ))}
        </Text>
        <Text size={'sm'} fw={500}>
          Input Format:
        </Text>
        <Text size={'sm'} color={theme.colors.gray[7]}>
          {codingQuestionOnUserSelectedId?.input_formate}
        </Text>
        <Text size={'sm'} fw={500}>
          Output Format:
        </Text>
        <Text size={'sm'} color={theme.colors.gray[7]}>
          {codingQuestionOnUserSelectedId?.output_formate}
        </Text>
        {codingQuestionOnUserSelectedId?.test_case.map((testCase, index) => (
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
        ))}
      </Stack>
    </ScrollArea>
  )
}

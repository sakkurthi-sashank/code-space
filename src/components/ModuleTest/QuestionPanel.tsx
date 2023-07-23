import { supabase } from '@/libs/supabase'
import { ScrollArea, Stack, Text, Title, useMantineTheme } from '@mantine/core'
import { useEffect, useState } from 'react'

interface CodingQuestion {
  id: string
  problem_name: string
  problem_statement: string
  input_formate: string
  output_formate: string
  test_case: {
    id: string
    coding_question_id: string
    input: string
    output: string
    is_sample_test_case: boolean
  }[]
}

export const QuestionPanel = ({
  currentUserSelectedQuestionId,
}: {
  currentUserSelectedQuestionId: string | null
}) => {
  const theme = useMantineTheme()

  const [codingQuestionOnUserSelectedId, setCodingQuestionOnUserSelectedId] =
    useState<CodingQuestion | null>(null)

  useEffect(() => {
    const fetchCodingQuestionOnUserSelectedId = async (questionId: string) => {
      const { data, error } = await supabase
        .from('coding_question')
        .select(
          `*, test_case (id, coding_question_id, input, output, is_sample_test_case)`,
        )
        .eq('id', questionId)
        .filter('test_case.is_sample_test_case', 'eq', true)
        .limit(1)

      if (error) {
        return
      }

      setCodingQuestionOnUserSelectedId(data ? data[0] : null)
    }

    if (!currentUserSelectedQuestionId) return

    fetchCodingQuestionOnUserSelectedId(currentUserSelectedQuestionId)
  }, [currentUserSelectedQuestionId])

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

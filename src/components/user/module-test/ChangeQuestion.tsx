import { CodingQuestion, TestCase } from '@/types/databaseExtractTypes.ts'
import { ActionIcon } from '@mantine/core'

export function ChangeQuestions({
  questionIds,
  allQuestions,
  setCurrentQuestion,
}: {
  questionIds: (string | undefined)[] | undefined
  allQuestions: (CodingQuestion & { test_case: TestCase[] })[] | undefined
  setCurrentQuestion: (
    question: CodingQuestion & { test_case: TestCase[] },
  ) => void
}) {
  return (
    <div className="flex space-x-2 h-full items-start justify-start border-b p-2">
      {questionIds?.map((questionId, index) => (
        <ActionIcon
          key={questionId}
          variant="light"
          color="indigo"
          onClick={() => {
            setCurrentQuestion(allQuestions?.[index]!)
          }}
        >
          <span className="text-sm">{index + 1}</span>
        </ActionIcon>
      ))}
    </div>
  )
}

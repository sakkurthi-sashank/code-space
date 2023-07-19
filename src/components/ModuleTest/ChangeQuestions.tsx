import { useTestStore } from '@/store/TestStore'
import { Button, Paper, useMantineTheme } from '@mantine/core'

export const ChangeQuestions = () => {
  const theme = useMantineTheme()

  const { codingQuestionIds, setCurrentSelectedQuestionId } = useTestStore(
    (state) => ({
      codingQuestionIds: state.codingQuestionIds,
      setCurrentSelectedQuestionId: state.setCurrentSelectedQuestionId,
    }),
  )

  return (
    <Paper
      bg={'white'}
      h={'7vh'}
      sx={{
        border: `1px solid ${theme.colors.gray[2]}`,
      }}
      radius={'sm'}
      className="flex items-center gap-2 px-2"
    >
      {codingQuestionIds.map((questionId, index) => (
        <Button
          key={questionId.id}
          variant="light"
          color="indigo"
          radius={'md'}
          size="xs"
          onClick={() => setCurrentSelectedQuestionId(index)}
        >
          {index + 1}
        </Button>
      ))}
    </Paper>
  )
}

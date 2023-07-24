import { supabase } from '@/libs/supabase'
import { Button, Paper, useMantineTheme } from '@mantine/core'
import { useEffect, useState } from 'react'

export const ChangeQuestions = ({
  setCurrentUserSelectedQuestionId,
  moduleId,
}: {
  setCurrentUserSelectedQuestionId: (
    currentUserSelectedQuestionId: string | null,
  ) => void
  moduleId: string
}) => {
  const theme = useMantineTheme()

  const [codingQuestionIds, setCodingQuestionIds] = useState<{ id: string }[]>(
    [],
  )
  const [isFirstQuestionLoaded, setIsFirstQuestionIsLoaded] =
    useState<boolean>(false)

  useEffect(() => {
    const fetchCodingQuestionIds = async (moduleId: string) => {
      const { data, error } = await supabase
        .from('coding_question')
        .select(`id`)
        .eq('module_id', moduleId)
      if (error) {
        return
      }
      setCodingQuestionIds(data ?? [])

      if (!isFirstQuestionLoaded) {
        setCurrentUserSelectedQuestionId(data ? data[0].id : '')
        setIsFirstQuestionIsLoaded(true)
      }
    }

    if (!moduleId) return

    fetchCodingQuestionIds(moduleId)
  }, [moduleId])

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
          onClick={() => setCurrentUserSelectedQuestionId(questionId.id)}
        >
          {index + 1}
        </Button>
      ))}
    </Paper>
  )
}

import { ActionIcon, useMantineTheme } from '@mantine/core'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export function ChangeQuestions({
  setCurrentUserSelectedQuestionId,
  moduleId,
}: {
  setCurrentUserSelectedQuestionId: (
    currentUserSelectedQuestionId: string | null,
  ) => void
  moduleId: string
}) {
  const theme = useMantineTheme()
  const supabaseClient = useSupabaseClient()

  const [codingQuestionIds, setCodingQuestionIds] = useState<{ id: string }[]>(
    [],
  )
  const [isFirstQuestionLoaded, setIsFirstQuestionIsLoaded] =
    useState<boolean>(false)

  useEffect(() => {
    const fetchCodingQuestionIds = async (moduleId: string) => {
      const { data, error } = await supabaseClient
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
  }, [
    moduleId,
    isFirstQuestionLoaded,
    setCurrentUserSelectedQuestionId,
    supabaseClient,
  ])

  return (
    <div className="flex space-x-2 h-full items-start justify-start border-b p-2">
      {codingQuestionIds.map((questionId, index) => (
        <ActionIcon
          key={questionId.id}
          variant="light"
          color="indigo"
          onClick={() => setCurrentUserSelectedQuestionId(questionId.id)}
        >
          <span className="text-sm">{index + 1}</span>
        </ActionIcon>
      ))}
    </div>
  )
}

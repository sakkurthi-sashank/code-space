import { supabase } from '@/libs/supabase'
import {
  Button,
  Flex,
  Table,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface ModuleInfoCompleteDetailsData {
  id: string
  module_name: string
  start_date: string
  end_date: string
  duration: number | null
  coding_question: {
    id: string
    marks: number | null
  }[]
  mcq_question: {
    id: string
    marks: number | null
  }[]
}

export function ModuleInfoCompleteDetails({
  currentUserSelectedModuleId,
}: {
  currentUserSelectedModuleId: string | null
}) {
  const theme = useMantineTheme()
  const router = useRouter()

  const [ModuleInfoCompleteDetailsData, setModuleInfoCompleteDetailsData] =
    useState<ModuleInfoCompleteDetailsData | null>(null)

  useEffect(() => {
    if (!currentUserSelectedModuleId) return

    const fetchUserSelectedModuleFullData = async (
      userSelectedModuleId: string,
    ) => {
      const { data, error } = await supabase
        .from('module')
        .select(
          `
          id,
          module_name,
          start_date,
          end_date,
          duration,
          coding_question (
            id,
            marks
          ),
          mcq_question (
            id,
            marks
          )
          `,
        )
        .eq('id', userSelectedModuleId)
        .single()

      if (error) return

      setModuleInfoCompleteDetailsData(data)
    }

    fetchUserSelectedModuleFullData(currentUserSelectedModuleId)
  }, [currentUserSelectedModuleId])

  if (!currentUserSelectedModuleId) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Title order={3} fw={500} color={theme.colors.gray[7]}>
          No Module Selected
        </Title>
      </div>
    )
  }

  const totalCodingMarks =
    ModuleInfoCompleteDetailsData?.coding_question.reduce(
      (acc, curr) => acc + (curr.marks || 0),
      0,
    )

  const totalMCQMarks = ModuleInfoCompleteDetailsData?.mcq_question.reduce(
    (acc, curr) => acc + (curr.marks || 0),
    0,
  )

  return (
    <div className="p-4">
      <Title order={2} fw={600} color={theme.colors.gray[7]}>
        {ModuleInfoCompleteDetailsData?.module_name}
      </Title>

      <Flex align={'center'} gap={'md'} mt={2}>
        <Text size={'xs'} color="dimmed">
          Starts Date:{' '}
          {new Date(
            ModuleInfoCompleteDetailsData?.start_date!,
          )?.toLocaleString()}
        </Text>
        <Text size={'xs'} color="dimmed">
          Ends Date:{' '}
          {new Date(ModuleInfoCompleteDetailsData?.end_date!)?.toLocaleString()}
        </Text>
      </Flex>

      <Table withBorder withColumnBorders className="mt-10">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Name</th>
            <th>No of Questions</th>
            <th>Type</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Section 1</td>
            <td>{ModuleInfoCompleteDetailsData?.coding_question?.length}</td>
            <td>Coding</td>
            <td>{totalCodingMarks}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Section 2</td>
            <td>{ModuleInfoCompleteDetailsData?.mcq_question?.length}</td>
            <td>MCQ</td>
            <td>{totalMCQMarks}</td>
          </tr>
        </tbody>
      </Table>

      <div className="mt-10">
        <div className="mt-6 flex justify-end space-x-4">
          <Button
            size="xs"
            onClick={() =>
              router.push(
                `/courses/module-test/validation/${currentUserSelectedModuleId}`,
              )
            }
          >
            Start Test
          </Button>
          <Button size="xs" variant="outline">
            View Result
          </Button>
        </div>
      </div>
    </div>
  )
}

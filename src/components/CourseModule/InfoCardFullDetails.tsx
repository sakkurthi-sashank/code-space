import { useModuleStore } from '@/store/moduleStore'
import {
  Button,
  Flex,
  Table,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useEffect } from 'react'

export function InfoCardFullDetails() {
  const theme = useMantineTheme()

  const { currentSelectedModuleId, fullModuleDetails, fetchFullModuleDetails } =
    useModuleStore((state) => ({
      currentSelectedModuleId: state.currentSelectedModuleId,
      fullModuleDetails: state.fullModuleDetails,
      fetchFullModuleDetails: state.fetchFullModuleDetails,
    }))

  useEffect(() => {
    if (!currentSelectedModuleId) return
    fetchFullModuleDetails(currentSelectedModuleId)
  }, [currentSelectedModuleId, fetchFullModuleDetails])

  if (!currentSelectedModuleId)
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Title order={3} fw={500} color={theme.colors.gray[7]}>
          No Module Selected
        </Title>
      </div>
    )

  return (
    <div className="p-4">
      <Title order={2} fw={600} color={theme.colors.gray[7]}>
        {fullModuleDetails?.module_name}
      </Title>

      <Flex align={'center'} gap={'md'} mt={2}>
        <Text size={'xs'} color="dimmed">
          Starts Date :
          {new Date(fullModuleDetails?.start_date as string).toLocaleString()}
        </Text>
        <Text size={'xs'} color="dimmed">
          Ends Date :{' '}
          {new Date(fullModuleDetails?.end_date as string).toLocaleString()}
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
            <td>{fullModuleDetails?.coding_question?.length}</td>
            <td>Coding</td>
            <td>
              {fullModuleDetails?.coding_question?.reduce(
                (prev, curr) => prev + curr.marks!,
                0,
              )}
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Section 2</td>
            <td>{fullModuleDetails?.mcq_question?.length}</td>
            <td>MCQ</td>
            <td>
              {fullModuleDetails?.mcq_question?.reduce(
                (prev, curr) => prev + curr.marks!,
                0,
              )}
            </td>
          </tr>
        </tbody>
      </Table>

      <div className="mt-10">
        <div className="mt-6 flex justify-end space-x-4">
          <Button size="xs">Start Test</Button>
          <Button size="xs" variant="outline">
            View Result
          </Button>
        </div>
      </div>
    </div>
  )
}

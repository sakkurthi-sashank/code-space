import {
  Badge,
  Button,
  Divider,
  Flex,
  Paper,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { CourseContentInfoModal } from './CourseContentInfoModal'

interface CourseContentCardProps {
  id: string
  assignmentName: string
  startDate: string
  endDate: string
}

const courseContentInfo = [
  {
    id: 1,
    name: 'Section 1',
    type: 'MCQ',
    questions: 10,
    time: '10 min',
    marks: 10,
  },
  {
    id: 2,
    name: 'Section 2',
    type: 'Coding Questions',
    questions: 5,
    time: '20 min',
    marks: 20,
  },
]

export const CourseContentCard = (props: CourseContentCardProps) => {
  const theme = useMantineTheme()
  const [opened, { close, open }] = useDisclosure(false)

  const FindDaysAgoFromStartDate = () => {
    const startDate = new Date(props.startDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const isContinueButtonDisabled = () => {
    const startDate = new Date(props.startDate)
    const endDate = new Date(props.endDate)
    const today = new Date()
    return today < startDate || today > endDate
  }

  const isViewResultButtonDisabled = () => {
    const endDate = new Date(props.endDate)
    const today = new Date()
    return today < endDate
  }

  return (
    <>
      <Paper p="md" radius={'md'} mih={130} withBorder>
        <div className="flex flex-wrap items-center justify-between">
          <div className="text-xl font-medium text-gray-800">
            {props.assignmentName}
          </div>
          <Badge color="cyan" size="sm" my={4}>
            {FindDaysAgoFromStartDate()} days ago
          </Badge>
        </div>
        <Flex justify="start" mt={4} gap={10}>
          <Text size={12} align="center">
            Starts At: {props.startDate}
          </Text>
          <Divider color={theme.colors.gray[2]} orientation="vertical" />
          <Text size={12} align="center">
            Ends At: {props.endDate}
          </Text>
        </Flex>
        <div className="space-x-4">
          <Button
            size="xs"
            mt={16}
            onClick={open}
            disabled={isContinueButtonDisabled()}
          >
            Continue
          </Button>
          <Button
            size="xs"
            mt={16}
            variant="outline"
            disabled={isViewResultButtonDisabled()}
          >
            View Result
          </Button>
        </div>
      </Paper>
      <CourseContentInfoModal
        opened={opened}
        close={close}
        courseId={props.id}
        courseTestId={'1'}
        courseContentInfo={courseContentInfo}
      />
    </>
  )
}

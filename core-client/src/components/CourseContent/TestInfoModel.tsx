import {
  Button,
  List,
  Modal,
  ScrollArea,
  Table,
  ThemeIcon,
} from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react'
import { useRouter } from 'next/router'

interface CourseContentInfoModalProps {
  opened: boolean
  close: () => void
  courseId: string
  courseTestId: String
  courseContentInfo: {
    id: number
    name: string
    type: string
    questions: number
    time: string
    marks: number
  }[]
}

export const CourseInfoContentCardModel = (
  props: CourseContentInfoModalProps,
) => {
  const router = useRouter()

  const rows = props.courseContentInfo.map((info) => (
    <tr key={info.id}>
      <td>{info.id}</td>
      <td>{info.name}</td>
      <td>{info.type}</td>
      <td>{info.questions}</td>
      <td>{info.time}</td>
      <td>{info.marks}</td>
    </tr>
  ))

  return (
    <>
      <Modal opened={props.opened} onClose={props.close} size="xl" pt={20}>
        <ScrollArea p={10}>
          <Table
            horizontalSpacing="xl"
            className="mx-auto"
            verticalSpacing="sm"
            withBorder
          >
            <thead>
              <tr>
                <th>Id</th>
                <th>Section</th>
                <th>Type</th>
                <th>Questions</th>
                <th>Time</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
        <List
          spacing={'lg'}
          size={'xs'}
          p={'sm'}
          mt={'xl'}
          icon={
            <ThemeIcon color="red" variant="light" size={18} radius="xl">
              <IconCircleCheck size="0.7rem" />
            </ThemeIcon>
          }
        >
          <List.Item>
            Before starting the exam, check that you have a reliable and
            high-speed internet connection to prevent any interruptions or
            connectivity issues during the exam.
          </List.Item>
          <List.Item>
            Use a web browser that is compatible with the online exam platform.
            Check for any specific browser requirements provided by your
            institution or exam provider.
          </List.Item>
          <List.Item>
            Keep track of the time allocated for the exam and manage it wisely.
            Pace yourself to ensure you have enough time to complete all the
            questions or sections of the exam within the given time frame.
          </List.Item>
          <List.Item>
            Read all instructions, questions, and prompts carefully before
            providing your answers. Pay attention to any specific requirements
            or restrictions mentioned in the instructions to ensure your
            responses are accurate and complete.
          </List.Item>
        </List>
        <div className="flex justify-end p-6">
          <Button
            fw={500}
            onClick={() =>
              router.push(
                `/courses/${props.courseId}test/${props.courseTestId}`,
              )
            }
          >
            Start Assignment
          </Button>
        </div>
      </Modal>
    </>
  )
}

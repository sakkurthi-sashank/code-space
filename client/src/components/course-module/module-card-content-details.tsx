import {
  Button,
  List,
  Modal,
  ScrollArea,
  Table,
  Text,
  ThemeIcon,
} from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react'

const information = [
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

export const ModuleCardContentDetails = ({
  opened,
  close,
  moduleId,
}: {
  opened: boolean
  close: () => void
  moduleId: string
}) => {

  

  const rows = information.map((info) => (
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
      <Modal opened={opened} onClose={close} size="xl" pt={20}>
        <Text
          p={'md'}
          className="text-gray-600"
          align="center"
          fw={500}
          size={'lg'}
        >
          Information
        </Text>
        <ScrollArea>
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
        <Text
          p={'md'}
          className="text-gray-600"
          align="center"
          fw={500}
          size={'lg'}
        >
          Instructions
        </Text>
        <List
          p={'sm'}
          spacing={'lg'}
          size={'xs'}
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
          <Button size="xs">Start Assignment</Button>
        </div>
      </Modal>
    </>
  )
}

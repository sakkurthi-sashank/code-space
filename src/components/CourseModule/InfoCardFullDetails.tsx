import {
  Button,
  Flex,
  List,
  Table,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react'

export const InfoCardFullDetails = ({}) => {
  const theme = useMantineTheme()

  const data = [
    {
      id: '51ae8fb6-2090-11ee-be56-0242ac120002',
      no_of_question: 10,
      type: 'MCQ',
      marks: 10,
      duration: '60',
    },
    {
      id: '51ae8fb6-2090-11ee-be56-0242ac120002',
      no_of_question: 10,
      type: 'Coding Questions',
      marks: 10,
      duration: '60',
    },
  ]

  const rows = data.map((element) => (
    <tr key={element.id}>
      <td>{element.no_of_question}</td>
      <td>{element.type}</td>
      <td>{element.marks}</td>
      <td>{element.duration}</td>
    </tr>
  ))

  return (
    <div className="p-4">
      <Title order={2} fw={600} color={theme.colors.gray[7]}>
        Introduction to Programming
      </Title>

      <Flex align={'center'} gap={'md'} mt={2}>
        <Text size={'xs'} color="dimmed">
          Starts Date : 2023-01-01 12:00PM
        </Text>
        <Text size={'xs'} color="dimmed">
          Ends Date : 2023-01-01 12:00PM
        </Text>
      </Flex>

      <Table withBorder withColumnBorders className="mt-10">
        <thead>
          <tr>
            <th>No of Question</th>
            <th>Type</th>
            <th>Marks</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>

      <div className="mt-10">
        <Title order={3} fw={600} color={theme.colors.gray[7]} align="center">
          Instructions
        </Title>

        <List
          p={'md'}
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

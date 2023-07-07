import { Button, Flex, ScrollArea, Table, Title } from '@mantine/core'
import { useRouter } from 'next/router'

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

export const ModuleDCardDetailView = ({ moduleId }: { moduleId: string }) => {
  const router = useRouter()

  const handleCardClick = (courseId: string, moduleId: string) => {
    router.push(`/courses/${courseId}/${moduleId}`)
  }

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
    <div className="p-6">
      <Title order={2} className="font-medium pb-6 text-gray-700">
        Introduction to Basic Data Structures
      </Title>
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
      <Flex justify="end" mt={10}>
        <Button
          fw={400}
          size="xs"
          onClick={() => handleCardClick(moduleId, '1')}
        >
          Start Exam
        </Button>
      </Flex>
    </div>
  )
}

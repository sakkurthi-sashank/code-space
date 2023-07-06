import {
  Badge,
  Button,
  Flex,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import axios from 'axios'
import { useQuery } from 'react-query'
import { ModuleDetails } from './module-details'

interface Module {
  module_id: string
  module_name: string
  module_unit: string
  module_start_date: string
  module_end_date: string
  is_result_disabled: boolean
  created_at: string
  course_id: string
}

export const ModuleInfoCards = ({ courseId }: { courseId: string }) => {
  const theme = useMantineTheme()

  const [opened, { open, close }] = useDisclosure(false)

  const studentId = 'fc8cb36a-93fc-42a1-a43b-3384730295c7'

  const { isLoading, error, data } = useQuery<Module[]>(
    ['course-module-details'],
    async () => {
      const response = await axios.post(
        'http://localhost:8080/api/course-module/get-course-modules-by-course-id-and-student-id',
        {
          courseId: courseId,
          studentId: studentId,
        },
      )
      return response.data
    },
    {
      enabled: !!courseId,
    },
  )

  return (
    <Stack p={'xs'}>
      {data?.map((module) => (
        <Paper
          w={'100%'}
          p={'sm'}
          radius={5}
          sx={{
            border: `1px solid ${theme.colors.gray[2]}`,
          }}
          key={module.module_id}
        >
          <Flex justify={'space-between'} wrap={'wrap'} align={'center'}>
            <Stack spacing={0}>
              <Flex align={'center'} gap={'md'}>
                <Title
                  order={4}
                  fw={600}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  color={theme.colors.gray[7]}
                >
                  {module.module_name}
                </Title>
                <Badge color="gray" size="sm" variant="light">
                  {module.module_unit}
                </Badge>
              </Flex>
              <Flex align={'center'} gap={'md'}>
                <Text size={'xs'} color="dimmed">
                  Starts Date {module.module_start_date}
                </Text>
                <Text size={'xs'} color="dimmed">
                  Ends Date {module.module_end_date}
                </Text>
              </Flex>
            </Stack>

            <Flex gap={'md'} mt={'sm'}>
              <Button size="xs" fw={500} onClick={open}>
                Continue
              </Button>
              <Button
                size="xs"
                fw={500}
                variant="outline"
                className="ml-2"
                disabled={module.is_result_disabled}
              >
                Results
              </Button>
            </Flex>
          </Flex>
          <ModuleDetails
            opened={opened}
            close={close}
            moduleId={module.module_id}
          />
        </Paper>
      ))}
    </Stack>
  )
}

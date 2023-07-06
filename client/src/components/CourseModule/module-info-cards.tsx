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
import { ModuleDetails } from './module-details'

interface Module {
  course_module_id: string
  module_name: string
  is_full_screen_enabled: boolean
  is_tab_switching_enabled: boolean
  module_unit: string
  module_start_date: string
  module_end_date: string
  is_result_disabled: boolean
  created_at: string
  course_id: string
}

export const ModuleInfoCards = () => {
  const theme = useMantineTheme()

  const [opened, { open, close }] = useDisclosure(false)

  const courseId = '8f83a252-400c-4e90-bdcb-0691732e48e5'
  const studentId = '3d815ad6-c63d-4c07-81a5-3b6bd89ebe1c'

  // const { isLoading, error, data } = useQuery<Module[]>(
  //   ['course-module-details'],
  //   async () => {
  //     const response = await axios.post(
  //       'http://localhost:8080/api/v1/course/get-course-modules-by-course-id-and-student-id',
  //       {
  //         courseId: courseId,
  //         studentId: studentId,
  //       },
  //     )
  //     return response.data
  //   },
  // )

  const data = [
    {
      module_id: '1',
      module_name: 'Introduction to Linked List',
      module_unit: 'Unit 1',
      module_start_date: 'July 6, 2021 12:00 PM',
      module_end_date: 'July 10, 2021 12:00 PM',
      is_result_disabled: false,
    },
  ]

  return (
    <Stack p={'sm'}>
      {data?.map((module) => (
        <Paper
          w={'100%'}
          p={'md'}
          radius={'md'}
          withBorder
          key={module.module_id}
        >
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

          <Flex align={'center'} justify={'space-between'} wrap={'wrap'}>
            <Stack spacing={2}>
              <Text size={'xs'} color="dimmed">
                Starts Date {module.module_start_date}
              </Text>
              <Text size={'xs'} color="dimmed">
                Ends Date {module.module_end_date}
              </Text>
            </Stack>

            <Flex mt={4} gap={'md'}>
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

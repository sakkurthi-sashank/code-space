import {
  Badge,
  Button,
  Divider,
  Paper,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ModuleCardContentDetails } from './ModuleDetails'

interface Module {
  course_module_id: string
  module_name: string
  module_description: string
  is_full_screen_enabled: boolean
  is_tab_switching_enabled: boolean
  module_unit: string
  module_start_date: string
  module_end_date: string
  is_result_disabled: boolean
  created_at: string
  course_id: string
}

export const ModuleDisplayCards = () => {
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
      module_name: 'Linked List Module',
      module_description: 'Basic Implementation of Linked List',
      module_unit: 'Unit 1',
      module_start_date: '2021-09-01 12:00 PM',
      module_end_date: '2021-09-30 12:00 PM',
      is_result_disabled: false,
    },
    {
      module_id: '1',
      module_name: 'Linked List Module',
      module_description: 'Module 1 Description',
      module_unit: 'Unit 1',
      module_start_date: '2021-09-01 12:00 PM',
      module_end_date: '2021-09-30 12:00 PM',
      is_result_disabled: false,
    },
  ]

  return (
    <div className="flex flex-wrap gap-2 p-2">
      {data?.map((module) => (
        <div key={module.module_id}>
          <Paper
            className="flex h-full max-w-sm flex-col gap-3 px-6 py-4"
            radius={'md'}
            sx={{
              borderBottom: `1px solid ${theme.colors.gray[2]}`,
            }}
            withBorder
          >
            <div className="flex items-center justify-between space-x-2">
              <div>
                <Text size={'md'} fw={600} color={theme.colors.gray[8]}>
                  {module.module_name}
                </Text>
                <Text size={'xs'} color={theme.colors.gray[7]}>
                  {module.module_description}
                </Text>
              </div>
              <Badge size="sm" color="gray">
                {module.module_unit}
              </Badge>
            </div>
            <Divider color={theme.colors.gray[2]} />
            <div className="flex flex-wrap space-y-1 pt-1">
              <Text size={'xs'} color={theme.colors.gray[7]}>
                <span className="font-medium">Starts At : </span>
                {module.module_start_date}
              </Text>
              <Text size={'xs'} color={theme.colors.gray[7]}>
                <span className="font-medium">Ends At : </span>
                {module.module_end_date}
              </Text>
            </div>

            <div className="flex w-fit justify-end">
              <Button size="xs" fw={500} onClick={open}>
                View Details
              </Button>
              <Button
                size="xs"
                fw={500}
                color="dark"
                variant="outline"
                className="ml-2"
                disabled={module.is_result_disabled}
              >
                Results
              </Button>
            </div>
          </Paper>
          <ModuleCardContentDetails
            moduleId={module.module_id}
            opened={opened}
            close={close}
          />
        </div>
      ))}
    </div>
  )
}

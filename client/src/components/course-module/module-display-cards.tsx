import { Badge, Button, Paper, Text, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import axios from 'axios'
import { useQuery } from 'react-query'
import { ModuleCardContentDetails } from './module-card-content-details'

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

  const { isLoading, error, data } = useQuery<Module[]>(
    ['course-module-details'],
    async () => {
      const response = await axios.post(
        'http://localhost:8080/api/v1/course/get-course-modules-by-course-id-and-student-id',
        {
          courseId: courseId,
          studentId: studentId,
        },
      )
      return response.data
    },
  )

  return (
    <div className="">
      {isLoading && <div>Loading...</div>}
      {data?.map((module) => (
        <div key={module.course_module_id}>
          <Paper
            className="flex h-full w-full flex-wrap items-center justify-between gap-3 px-6 py-4"
            sx={{
              borderBottom: `1px solid ${theme.colors.gray[2]}`,
            }}
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Text size={'md'} fw={500} color={theme.colors.gray[7]}>
                  {module.module_name}
                </Text>
                <Badge size="sm" color="gray">
                  {module.module_unit}
                </Badge>
              </div>
              <div className="flex flex-wrap space-x-3">
                <Text size={'xs'} color={theme.colors.gray[7]}>
                  Starts At {module.module_start_date}
                </Text>
                <Text size={'xs'} color={theme.colors.gray[7]}>
                  Ends At {module.module_end_date}
                </Text>
              </div>
            </div>
            <Button size="xs" fw={500} onClick={open}>
              View Details
            </Button>
          </Paper>
          <ModuleCardContentDetails
            moduleId={module.course_module_id}
            opened={opened}
            close={close}
          />
        </div>
      ))}
    </div>
  )
}

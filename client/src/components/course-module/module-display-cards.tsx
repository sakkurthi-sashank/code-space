import { FetchCourseModuleDetails } from '@/services/course/fetch-course-module-details'
import {
  Badge,
  Button,
  List,
  Paper,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ModuleCardContentDetails } from './module-card-content-details'

export const ModuleDisplayCards = () => {
  const theme = useMantineTheme()

  const [opened, { open, close }] = useDisclosure(false)

  const { isLoading, error, data } = FetchCourseModuleDetails({
    courseId: 'cf01c613-2b72-41f9-ac3a-6fd4ab13b3fa',
    studentId: '4e29e9fa-b0ea-499f-bbb5-c7ab124db622',
  })

  return (
    <div className="">
      {isLoading && <div>Loading...</div>}
      {data?.map((module) => (
        <div>
          <Paper
            className="flex h-full w-full flex-wrap items-center justify-between gap-3 px-6 py-4"
            sx={{
              borderBottom: `1px solid ${theme.colors.gray[2]}`,
            }}
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Text size={'md'} fw={500} color={theme.colors.gray[7]}>
                  {module.moduleName}
                </Text>
                <Badge size="sm" color="gray">
                  UNIT - 1
                </Badge>
                <Badge size="sm" color="green">
                  Completed
                </Badge>
              </div>
              <div className="flex flex-wrap">
                <List size="xs">
                  <List.Item>Starts At Jun 3 2021 12:00PM</List.Item>
                  <List.Item>Ends At Jun 3 2023 12:00PM</List.Item>
                </List>
              </div>
            </div>
            <Button size="xs" fw={500} onClick={open}>
              View Details
            </Button>
          </Paper>
          <ModuleCardContentDetails opened={opened} close={close} />
        </div>
      ))}
    </div>
  )
}

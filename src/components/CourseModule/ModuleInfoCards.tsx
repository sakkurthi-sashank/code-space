import { useModuleStore } from '@/store/moduleStore'
import {
  ActionIcon,
  Flex,
  Paper,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import { useEffect } from 'react'

export const ModuleInfoCards = ({ courseId }: { courseId: string }) => {
  const theme = useMantineTheme()

  const {
    previewModuleDetails,
    setCurrentSelectedModuleId,
    fetchPreviewModuleDetails,
  } = useModuleStore((state) => ({
    previewModuleDetails: state.previewModuleDetails,
    setCurrentSelectedModuleId: state.setCurrentSelectedModuleId,
    fetchPreviewModuleDetails: state.fetchPreviewModuleDetails,
  }))

  useEffect(() => {
    fetchPreviewModuleDetails(courseId)
  }, [courseId, fetchPreviewModuleDetails])

  return (
    <>
      {previewModuleDetails?.map((module) => (
        <Paper
          className="w-full px-4 py-3"
          radius={0}
          key={module.id}
          sx={{
            borderBottom: `1px solid ${theme.colors.gray[2]}`,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <Title order={4} fw={500} className="truncate text-gray-600">
                {module.module_name}
              </Title>
              <Flex align={'center'} gap={'md'} mt={2}>
                <Text size={'xs'} color="dimmed">
                  Starts Date :{' '}
                  {new Date(module.start_date as string).toLocaleString()}
                </Text>
                <Text size={'xs'} color="dimmed">
                  Ends Date :{' '}
                  {new Date(module.end_date as string).toLocaleString()}
                </Text>
              </Flex>
            </div>
            <ActionIcon
              variant="light"
              color="gray"
              onClick={() => {
                setCurrentSelectedModuleId(module.id!)
              }}
            >
              <IconChevronRight size={20} stroke={1.5} />
            </ActionIcon>
          </div>
        </Paper>
      ))}
    </>
  )
}

import { supabase } from '@/libs/supabase'
import {
  ActionIcon,
  Flex,
  Paper,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

interface ModuleCardInfoData {
  id: string
  module_name: string
  start_date: string
  end_date: string
  course: {
    id: string
    profile_enrolled_course: {
      profile_id: string
    }[]
  } | null
}

export const ModuleInfoCards = ({
  userId,
  courseId,
  setUserSelectedModuleId,
}: {
  userId: string
  courseId: string
  setUserSelectedModuleId: (id: string) => void
}) => {
  const theme = useMantineTheme()

  const [moduleCardInfoData, setModuleCardInfoData] = useState<
    ModuleCardInfoData[] | null
  >(null)

  useEffect(() => {
    if (!courseId || !userId) return

    const fetchModuleCardInfoData = async () => {
      const { data, error } = await supabase
        .from('module')
        .select(
          `
          id,
          module_name,
          start_date,
          end_date,
          course(
            id,
            profile_enrolled_course(
              profile_id
            )
          )
        `,
        )
        .eq('course_id', courseId)
        .eq('course.profile_enrolled_course.profile_id', userId)

      if (error) return

      setModuleCardInfoData(data)
    }

    fetchModuleCardInfoData()
  }, [courseId, userId])

  return (
    <>
      {moduleCardInfoData?.map((module) => (
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
                setUserSelectedModuleId(module.id!)
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

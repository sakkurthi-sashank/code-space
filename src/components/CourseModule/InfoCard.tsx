import {
  ActionIcon,
  Flex,
  Paper,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'

interface InfoCardProps {
  module_name: string
  start_date: string
  end_date: string
  id: string
  setModuleId: (id: string) => void
}

export const InfoCard = ({
  module_name,
  start_date,
  end_date,
  id,
  setModuleId,
}: InfoCardProps) => {
  const theme = useMantineTheme()

  const handleSetModuleId = () => {
    setModuleId(id)
  }

  return (
    <Paper
      className="w-full px-4 py-3"
      radius={0}
      sx={{
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <Title order={4} fw={500} className="truncate text-gray-600">
            {module_name}
          </Title>
          <Flex align={'center'} gap={'md'} mt={2}>
            <Text size={'xs'} color="dimmed">
              Starts Date : {start_date}
            </Text>
            <Text size={'xs'} color="dimmed">
              Ends Date : {end_date}
            </Text>
          </Flex>
        </div>
        <ActionIcon variant="light" color="gray" onClick={handleSetModuleId}>
          <IconChevronRight size={20} stroke={1.5} />
        </ActionIcon>
      </div>
    </Paper>
  )
}

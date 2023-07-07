import {
  ActionIcon,
  Flex,
  Paper,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'

interface Module {
  module_id: string
  module_name: string
  module_start_date: string
  module_end_date: string
}

export const ModuleInfoCards: React.FC<Module> = ({
  module_id,
  module_name,
  module_start_date,
  module_end_date,
}) => {
  const theme = useMantineTheme()

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
              Starts Date {module_start_date}
            </Text>
            <Text size={'xs'} color="dimmed">
              Ends Date {module_end_date}
            </Text>
          </Flex>
        </div>
        <ActionIcon variant="light" color="gray">
          <IconChevronRight size={20} stroke={1.5} />
        </ActionIcon>
      </div>
    </Paper>
  )
}

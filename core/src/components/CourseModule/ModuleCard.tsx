import { formatDate } from '@/utils/formatDate'
import {
  Badge,
  Button,
  Divider,
  Flex,
  Paper,
  Text,
  useMantineTheme,
} from '@mantine/core'

interface ModuleCardProps {
  contentName: string
  courseContentStartDate: string
  courseContentEndDate: string
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  contentName,
  courseContentStartDate,
  courseContentEndDate,
}) => {
  const theme = useMantineTheme()

  const FindDaysAgoFromStartDate = (date: string) => {
    const startDate = new Date(date)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div>
      <Paper p="md" radius={'md'} mih={130} withBorder>
        <div className="flex flex-wrap items-center justify-between">
          <div className="text-xl font-medium text-gray-800">{contentName}</div>
          <Badge color="cyan" size="sm" my={4}>
            {FindDaysAgoFromStartDate(courseContentStartDate)} Days Ago
          </Badge>
        </div>
        <Flex justify="start" mt={4} gap={10}>
          <Text size={12} align="center">
            Starts At: {formatDate(courseContentStartDate)}
          </Text>
          <Divider color={theme.colors.gray[2]} orientation="vertical" />
          <Text size={12} align="center">
            Ends At: {formatDate(courseContentEndDate)}
          </Text>
        </Flex>
        <div className="space-x-4">
          <Button size="xs" mt={16}>
            Continue
          </Button>
          <Button size="xs" mt={16} variant="outline">
            View Result
          </Button>
        </div>
      </Paper>
    </div>
  )
}

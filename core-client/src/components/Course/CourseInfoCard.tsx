import { formatDate } from '@/utils/formatDate'
import {
  Badge,
  Card,
  Divider,
  Flex,
  Progress,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core'
import { IconCalendarTime } from '@tabler/icons-react'
import { useRouter } from 'next/router'

interface CourseInfoCardProps {
  id: string
  courseName: string
  courseUnqId: string
  courseDescription: string
  professorName: string
  courseStartDate: string
  courseEndDate: string
  learningTags: string[]
}

export const CourseInfoCard: React.FC<CourseInfoCardProps> = ({
  id,
  courseName,
  courseUnqId,
  courseDescription,
  professorName,
  courseStartDate,
  courseEndDate,
  learningTags,
}) => {
  const router = useRouter()

  const getCourseValidity = () => {
    const start = new Date(courseStartDate)
    const end = new Date(courseEndDate)
    const today = new Date()

    const totalDays = Math.floor(
      (end.getTime() - start.getTime()) / (1000 * 3600 * 24),
    )
    const daysPassed = Math.floor(
      (today.getTime() - start.getTime()) / (1000 * 3600 * 24),
    )
    return Math.floor((daysPassed / totalDays) * 100)
  }

  const handleCardClick = () => {
    router.push(`/courses/${id}`)
  }

  return (
    <Card
      shadow="xs"
      radius="md"
      withBorder
      className="w-full max-w-sm cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-xl"
      sx={{
        minHeight: 320,
      }}
      onClick={handleCardClick}
    >
      <Card.Section px={20} py={16}>
        <Stack spacing={4}>
          <Text
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            size={30}
            weight={500}
            color="dark"
          >
            {courseName}
          </Text>
          <Text size={12}>Course ID: {courseUnqId}</Text>
          <Text size={12}>{courseDescription}</Text>
          <Text size={12}>Professor: {professorName}</Text>
        </Stack>
      </Card.Section>

      <Card.Section px={20} py={8}>
        <Flex gap={10}>
          {learningTags?.map((tag) => (
            <Badge color="indigo" variant="light" key={tag}>
              {tag}
            </Badge>
          ))}
        </Flex>
      </Card.Section>

      <Card.Section px={20} py={14}>
        <div className="flex justify-around">
          <UnstyledButton className="flex items-center justify-between space-x-3">
            <ThemeIcon variant="light" radius="xl" size="sm" color="green">
              <IconCalendarTime stroke={1.5} size={'0.8rem'} />
            </ThemeIcon>
            <Text size={12} color="gray">
              Starts Date <br /> {formatDate(courseStartDate)}
            </Text>
          </UnstyledButton>

          <Divider orientation="vertical" />

          <UnstyledButton className="flex items-center justify-between space-x-3">
            <ThemeIcon variant="light" radius="xl" size="sm" color="red">
              <IconCalendarTime stroke={1.5} size={'0.8rem'} />
            </ThemeIcon>
            <Text size={12} color="gray">
              Ends Date <br /> {formatDate(courseEndDate)}
            </Text>
          </UnstyledButton>
        </div>
      </Card.Section>

      <Card.Section px={20} py={10}>
        <Stack spacing={10}>
          <Stack spacing={6}>
            <Text size={12} color="gray">
              Validity
            </Text>
            <Progress color="red" size="sm" value={getCourseValidity()} />
          </Stack>
        </Stack>
      </Card.Section>
    </Card>
  )
}

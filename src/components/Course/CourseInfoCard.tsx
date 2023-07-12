import { StudentCourse } from '@/types/course'
import {
  Badge,
  Card,
  Flex,
  Progress,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { IconCalendarTime } from '@tabler/icons-react'
import { useRouter } from 'next/router'

interface DateBadgeProps {
  display_date: string
  display_title: string
  iconColor: string
}

export const DateBadge: React.FC<DateBadgeProps> = ({
  display_date,
  display_title,
  iconColor,
}) => {
  return (
    <Flex align="center" gap={10}>
      <ThemeIcon variant="light" radius="sm" size="sm" color={iconColor}>
        <IconCalendarTime size="0.6rem" />
      </ThemeIcon>
      <Text size="xs" color="dimmed">
        {display_title} : {display_date}
      </Text>
    </Flex>
  )
}

export const CourseInfoCard: React.FC<StudentCourse> = ({
  id,
  course_name,
  learning_tags,
  course_code,
  end_date,
  start_date,
  course_description,
  professor_name,
  validity,
}) => {
  const router = useRouter()

  const handleCardClick = (courseId: string) => {
    router.push(`/courses/${courseId}`)
  }

  return (
    <Card
      key={id}
      radius={5}
      withBorder
      className="max-w-sm w-full px-5 pb-8 cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
      onClick={() => handleCardClick(id)}
    >
      <Stack spacing={4} mt={0}>
        <Title order={2} className="truncate font-semibold text-gray-700">
          {course_name}
        </Title>
        <Text size="xs" color="dimmed">
          Course ID: {course_code}
        </Text>
        <Text size="xs" color="dimmed">
          {course_description}
        </Text>
        <Text size="xs" color="dimmed">
          Professor: {professor_name}
        </Text>
      </Stack>

      <Flex gap={10} mt={10} className="truncate">
        {learning_tags?.map((tag) => (
          <Badge color="indigo" size="md" variant="light" key={tag}>
            {tag}
          </Badge>
        ))}
      </Flex>

      <Stack spacing={8} pt="md">
        <DateBadge
          display_date={start_date}
          display_title="Starts Date"
          iconColor="green"
        />
        <DateBadge
          display_date={end_date}
          display_title="Ends Date"
          iconColor="red"
        />
      </Stack>

      <Stack spacing={4} mt="md">
        <Text size={10} color="gray">
          Validity
        </Text>
        <Progress color="gray" size="sm" value={validity} />
      </Stack>
    </Card>
  )
}

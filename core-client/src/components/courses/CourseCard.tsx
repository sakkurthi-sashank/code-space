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

interface CourseCardProps {
  id: string
  courseName: string
  courseDescription: string
  professorName: string
  Learningtags: string[]
  courseStartDate: string
  courseEndDate: string
  Studentprogress: number
}

export function CourseCard(props: CourseCardProps) {
  const router = useRouter()

  const formattedDateStart = new Date(props.courseStartDate).toDateString()
  const formattedDateEnd = new Date(props.courseEndDate).toDateString()

  const checkCourseValidityFromStartDateAndEndDate = () => {
    const { courseStartDate, courseEndDate } = props
    const startDate = new Date(courseStartDate)
    const endDate = new Date(courseEndDate)
    const today = new Date()

    const totalDays = Math.floor(
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
    )
    const daysPassed = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
    )

    return Math.floor((daysPassed / totalDays) * 100)
  }

  return (
    <Card
      shadow="xs"
      radius="md"
      withBorder
      className="w-full max-w-sm cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-xl"
      sx={{
        minHeight: 310,
      }}
      onClick={() => router.push(`/courses/courseId=${props.id}`)}
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
            {props.courseName}
          </Text>
          <Text size={12}>{props.courseDescription}</Text>
          <Text size={12}>Professor: {props.professorName}</Text>
        </Stack>
      </Card.Section>

      <Card.Section px={20} py={8}>
        <Flex gap={10}>
          {props.Learningtags ? (
            props.Learningtags.map((tag) => (
              <Badge color="indigo" variant="light" key={tag}>
                {tag}
              </Badge>
            ))
          ) : (
            <Badge color="gray" variant="light" key={props.courseName}>
              No tags
            </Badge>
          )}
        </Flex>
      </Card.Section>

      <Card.Section px={20} py={14}>
        <div className="flex justify-around">
          <UnstyledButton className="flex items-center justify-between space-x-3">
            <ThemeIcon variant="light" radius="xl" size="sm" color="green">
              <IconCalendarTime stroke={1.5} size={'0.8rem'} />
            </ThemeIcon>
            <Text size={12} color="gray">
              Starts Date <br /> {formattedDateStart}
            </Text>
          </UnstyledButton>

          <Divider orientation="vertical" />

          <UnstyledButton className="flex items-center justify-between space-x-3">
            <ThemeIcon variant="light" radius="xl" size="sm" color="red">
              <IconCalendarTime stroke={1.5} size={'0.8rem'} />
            </ThemeIcon>
            <Text size={12} color="gray">
              Ends Date <br /> {formattedDateEnd}
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
            <Progress
              color="red"
              size="sm"
              value={checkCourseValidityFromStartDateAndEndDate()}
            />
          </Stack>
        </Stack>
      </Card.Section>
    </Card>
  )
}

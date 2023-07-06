import {
  Badge,
  Card,
  Divider,
  Flex,
  Progress,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { IconCalendarTime } from '@tabler/icons-react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'

interface Course {
  course_id: string
  course_name: string
  learning_tags: string[]
  course_code: string
  course_end_date: string
  course_start_date: string
  course_description: string
  professor_name: string
  validity: number
}

export const CourseInfoCards: React.FC = () => {
  const router = useRouter()
  const theme = useMantineTheme()

  const handleCardClick = (courseId: string) => {
    router.push(`/courses/${courseId}`)
  }

  const studentId = '3d815ad6-c63d-4c07-81a5-3b6bd89ebe1c'

  const { data } = useQuery<Course[]>(['course'], async () => {
    const response = await axios.post<Course[]>(
      'http://localhost:8080/api/v1/course/get-courses-by-student-id',
      { studentId },
    )
    return response.data!
  })

  return (
    <Flex wrap="wrap" gap="md" p="md">
      {data?.map((course) => (
        <Card
          key={course.course_id}
          shadow="xs"
          radius="md"
          padding="lg"
          withBorder
          onClick={() => handleCardClick(course.course_id)}
          sx={{
            width: '100%',
            maxWidth: 360,
            cursor: 'pointer',
            transition: 'box-shadow 200ms ease',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
            },
          }}
        >
          <Stack spacing={3} mt={0}>
            <Title
              order={2}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              weight={600}
              color={theme.colors.gray[7]}
            >
              {course.course_name}
            </Title>
            <Text size="xs" color="dimmed">
              Course ID: {course.course_code}
            </Text>
            <Text size="xs" color="dimmed">
              {course.course_description}
            </Text>
            <Text size="xs" color="dimmed">
              Professor: {course.professor_name}
            </Text>
          </Stack>
          <Divider my="md" color={theme.colors.gray[2]} />
          <Flex gap={10}>
            {course.learning_tags?.map((tag) => (
              <Badge color="gray" size="sm" variant="light" key={tag}>
                {tag}
              </Badge>
            ))}
          </Flex>
          <Stack spacing={8} pt="md">
            <Flex align="center" gap={10}>
              <ThemeIcon variant="light" radius="sm" size="sm" color="green">
                <IconCalendarTime size="0.6rem" />
              </ThemeIcon>
              <Text size="xs" color="dimmed">
                Starts Date {course.course_start_date}
              </Text>
            </Flex>
            <Flex align="center" gap={10}>
              <ThemeIcon variant="light" radius="sm" size="sm" color="red">
                <IconCalendarTime size="0.6rem" />
              </ThemeIcon>
              <Text size="xs" color="dimmed">
                Ends Date {course.course_end_date}
              </Text>
            </Flex>
          </Stack>
          <Stack spacing={4} mt="md">
            <Text size="xs" color="gray">
              Validity
            </Text>
            <Progress color="red" size="sm" value={course.validity} />
          </Stack>
        </Card>
      ))}
    </Flex>
  )
}

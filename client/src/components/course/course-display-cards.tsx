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
import axios from 'axios'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

interface Course {
  course_id: string
  course_name: string
  first_name: string
  last_name: string
  learning_tags: string[]
  course_code: string
  course_end_date: string
  course_start_date: string
  course_description: string
  professor_first_name: string
  professor_last_name: string
  validity: number
}

export const CourseDisplayCards = () => {
  const router = useRouter()

  const handleCardClick = (courseId: string) => {
    router.push(`/courses/${courseId}`)
  }

  const studentId = '3d815ad6-c63d-4c07-81a5-3b6bd89ebe1c'

  const { data } = useQuery<Course[]>(['course'], async () => {
    const response = await axios.post<Course[]>(
      'http://localhost:8080/api/v1/course/get-courses-by-student-id',
      { studentId },
    )
    return response.data
  })

  return (
    <Flex wrap="wrap" gap="md" p="md">
      {data?.map((course) => (
        <Card
          key={course.course_id}
          shadow="xs"
          radius="md"
          withBorder
          className="w-full max-w-sm cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-xl"
          sx={{
            minHeight: 320,
          }}
          onClick={() => handleCardClick(course.course_id)}
        >
          {/* Course Details */}
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
                {course.course_name}
              </Text>
              <Text size={12}>Course ID: {course.course_id}</Text>
              <Text size={12}>{course.course_description}</Text>
              <Text size={12}>
                Professor: {course.professor_first_name}
                {course.professor_last_name}
              </Text>
            </Stack>
          </Card.Section>

          {/* Learning Tags */}
          <Card.Section px={20} py={8}>
            <Flex gap={10}>
              {course.learning_tags?.map((tag) => (
                <Badge color="indigo" variant="light" key={tag}>
                  {tag}
                </Badge>
              ))}
            </Flex>
          </Card.Section>

          {/* Start And Ends Dates */}
          <Card.Section px={20} py={14}>
            <Flex justify="space-around">
              <UnstyledButton className="flex items-center space-x-3">
                <ThemeIcon variant="light" radius="xl" size="sm" color="green">
                  <IconCalendarTime stroke={1.5} size="0.8rem" />
                </ThemeIcon>
                <Text size={12} color="gray">
                  Starts Date <br /> {course.course_start_date}
                </Text>
              </UnstyledButton>

              <Divider orientation="vertical" />

              <UnstyledButton className="flex items-center space-x-3">
                <ThemeIcon variant="light" radius="xl" size="sm" color="red">
                  <IconCalendarTime stroke={1.5} size="0.8rem" />
                </ThemeIcon>
                <Text size={12} color="gray">
                  Ends Date <br /> {course.course_end_date}
                </Text>
              </UnstyledButton>
            </Flex>
          </Card.Section>

          {/* Course Validity */}
          <Card.Section px={20} py={10}>
            <Stack spacing={10}>
              <Stack spacing={6}>
                <Text size={12} color="gray">
                  Validity
                </Text>
                <Progress color="red" size="sm" value={course.validity} />
              </Stack>
            </Stack>
          </Card.Section>
        </Card>
      ))}
    </Flex>
  )
}

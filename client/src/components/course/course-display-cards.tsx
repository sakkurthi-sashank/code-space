import { FetchStudentCourseDetails } from '@/services/course/fetch-student-course-details'
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

export const CourseDisplayCards = () => {
  const router = useRouter()

  const handleCardClick = (courseId: string) => {
    router.push(`/courses/${courseId}`)
  }

  const { data } = FetchStudentCourseDetails({
    studentId: '4e29e9fa-b0ea-499f-bbb5-c7ab124db622',
  })

  return (
    <Flex wrap="wrap" gap="md" p="md">
      {data?.map((course) => (
        <Card
          key={course.id}
          shadow="xs"
          radius="md"
          withBorder
          className="w-full max-w-sm cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-xl"
          sx={{
            minHeight: 320,
          }}
          onClick={() => handleCardClick(course.id)}
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
                {course.courseName}
              </Text>
              <Text size={12}>Course ID: {course.courseCode}</Text>
              <Text size={12}>{course.courseDescription}</Text>
              <Text size={12}>Professor: {course.professorName}</Text>
            </Stack>
          </Card.Section>

          {/* Learning Tags */}
          <Card.Section px={20} py={8}>
            <Flex gap={10}>
              {course.learningTags?.map((tag: string) => (
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
                  Starts Date <br /> {course.courseStartDate}
                </Text>
              </UnstyledButton>

              <Divider orientation="vertical" />

              <UnstyledButton className="flex items-center space-x-3">
                <ThemeIcon variant="light" radius="xl" size="sm" color="red">
                  <IconCalendarTime stroke={1.5} size="0.8rem" />
                </ThemeIcon>
                <Text size={12} color="gray">
                  Ends Date <br /> {course.courseEndDate}
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

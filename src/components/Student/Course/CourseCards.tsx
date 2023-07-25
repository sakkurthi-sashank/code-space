import { useAuth } from '@/hooks/useAuth'
import { fetchCourseCardsData } from '@/service/course'
import { Course, Profile, ProfileEnrolledCourse } from '@/types/types'
import { Badge, Card, Flex, Image, Stack, Text, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type CourseCardsProps = Course & {
  professor: Profile | null
  profile_enrolled_course: ProfileEnrolledCourse[]
}

export function CourseCards() {
  const router = useRouter()
  const { user } = useAuth()

  const [CourseCardsData, setCourseCardsData] = useState<
    CourseCardsProps[] | null
  >(null)

  useEffect(() => {
    if (!user) return
    fetchCourseCardsData(user?.id).then((data) => setCourseCardsData(data!))
  }, [user])

  return (
    <>
      {CourseCardsData?.map((course, _index) => (
        <Card
          withBorder
          key={course.id}
          radius={'md'}
          onClick={() => router.push(`/courses/module/${course.id}`)}
          className="max-w-sm w-full min-h-[310px] h-full hover:shadow-lg 
                cursor-pointer shadow-sm transition-all duration-200"
        >
          <Card.Section>
            <Image
              src={course.course_image}
              alt="Data Structures and Algorithms"
              width={'100%'}
              height={120}
            />
          </Card.Section>

          <Stack p={10} spacing={8}>
            <Title order={3} fw={600} truncate={true}>
              {course.course_name}
            </Title>
            <Text size={'xs'} color="gray" truncate={true}>
              {course.course_description}
            </Text>
            <Text size={'xs'} color="gray" truncate={true}>
              Course Code : {course.course_code}
            </Text>
            <Text size={'xs'} color="gray" truncate={true}>
              Professor : Dr. {course.professor?.display_name}
            </Text>
          </Stack>

          <Stack px={10} spacing={8}>
            <Flex gap={10} mt={10}>
              {course.learning_tags?.map((tag) => (
                <Badge color="indigo" key={tag} size="sm" variant="light">
                  {tag}
                </Badge>
              ))}
            </Flex>
          </Stack>
        </Card>
      ))}
    </>
  )
}

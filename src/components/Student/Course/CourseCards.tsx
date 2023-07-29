import { useAuth } from '@/hooks/useAuth'
import { fetchCourseCardsData } from '@/service/course'
import { Course, ProfileEnrolledCourse } from '@/types/types'
import { Badge, Card, Group, Image, Text, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type CourseCardsProps = Course & {
  profile_enrolled_course: ProfileEnrolledCourse[]
  module: {
    id: string
  }[]
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
          className="max-w-sm w-full h-full hover:shadow-lg 
                cursor-pointer shadow-sm transition-all duration-200"
        >
          <Card.Section>
            <Image
              src={course.course_image}
              alt="Data Structures and Algorithms"
              width={'100%'}
              height={100}
            />
          </Card.Section>

          <Group p={10} spacing={'sm'}>
            <Title order={2} fw={600}>
              {course.course_name}
            </Title>
            <Text color="gray" size={'xs'}>
              {course.course_description}
            </Text>

            <div className="grid grid-cols-2 gap-2">
              <Badge color="indigo" size="xs" p={14} variant="outline">
                Course Code : {course.course_code}
              </Badge>
              <Badge color="violet" size="xs" p={14} variant="outline">
                No of Modules : {course.module.length}
              </Badge>
              <Badge color="cyan" size="xs" p={14} variant="outline" w={'100%'}>
                Start : {new Date(course.start_date!).toDateString()}
              </Badge>
              <Badge color="red" size="xs" p={14} variant="outline" w={'100%'}>
                End: {new Date(course.end_date!).toDateString()}
              </Badge>
            </div>
          </Group>
        </Card>
      ))}
    </>
  )
}

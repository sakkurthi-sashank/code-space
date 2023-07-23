import { supabase } from '@/libs/supabase'
import { Badge, Card, Flex, Image, Stack, Text, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface CourseInfoCardData {
  id: string
  course_image: string
  course_name: string
  course_description: string
  course_code: string
  learning_tags: string[] | undefined
  professor: {
    id: string
    display_name: string
  } | null
  profile_enrolled_course: {
    id: string
    profile_id: string
    is_achieved: boolean | null
  }[]
}

export function CourseInfoCards({ userId }: { userId: string }) {
  const router = useRouter()

  const [courseInfoCardsData, setCourseInfoCardsData] = useState<
    CourseInfoCardData[] | null
  >(null)

  useEffect(() => {
    async function fetchCourseInfoCardsData(userId: string) {
      if (!userId) return

      const { data, error } = await supabase
        .from('course')
        .select(
          `
          id,
          course_image,
          course_name,
          course_description,
          course_code,
          learning_tags,
          professor:profile(
            id,
            display_name
          ),
          profile_enrolled_course!inner(
            id,
            profile_id,
            is_achieved
          )
        `,
        )
        .filter('profile_enrolled_course.profile_id', 'eq', userId)
        .order('course_name', { ascending: false })

      if (error) return

      setCourseInfoCardsData(data)
    }

    fetchCourseInfoCardsData(userId)
  }, [userId])

  return (
    <>
      {courseInfoCardsData?.map((course, _index) => (
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

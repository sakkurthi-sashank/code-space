import { Course, CourseEnrollment } from '@/types/databaseExtractTypes.ts'
import { Database } from '@/types/supabase'
import { formatCustomDateWithOutTime } from '@/utils/formatCustomDate'
import { Badge, Card, Group, Image, Text, Title } from '@mantine/core'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

type CourseCards = Course & {
  course_enrollment: CourseEnrollment[]
  module: {
    id: string
  }[]
}

export function CourseCards(): JSX.Element {
  const router = useRouter()
  const user = useSession()
  const supabaseClient = useSupabaseClient<Database>()

  const { data, error, isLoading } = useQuery<CourseCards[], Error>(
    'user-courses',
    async () => {
      const { data, error } = await supabaseClient
        .from('course')
        .select(`*, course_enrollment!inner(*),module(id)`)
        .eq('course_enrollment.profile_id', user?.user.id)
        .order('created_at', { ascending: false })
      return error ? [] : data || []
    },
    {
      enabled: !!user?.user.id,
    },
  )

  return (
    <div className="flex-wrap flex p-4 gap-4">
      {data?.map((course) => (
        <Card
          withBorder
          key={course.id}
          radius={'md'}
          onClick={() => router.push(`/courses/modules/${course.id}`)}
          className="max-w-sm w-full h-full hover:shadow-lg 
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

          <Group p={10} spacing={'sm'}>
            <Title order={3} fw={600} truncate>
              {course.course_name}
            </Title>
            <Text size="xs" color="gray">
              {course.course_description}
            </Text>
            <div className="grid grid-cols-2 mt-2 w-full place-content-between gap-3">
              <Badge color="indigo" size="xs" p={14} variant="outline">
                Course Code : {course.course_code}
              </Badge>
              <Badge color="violet" size="xs" p={14} variant="outline">
                No of Modules : {course.module.length}
              </Badge>
              <Badge color="cyan" size="xs" p={14} variant="outline" w={'100%'}>
                Start At: {formatCustomDateWithOutTime(course.start_date!)}
              </Badge>
              <Badge color="red" size="xs" p={14} variant="outline" w={'100%'}>
                End At: {formatCustomDateWithOutTime(course.end_date!)}
              </Badge>
            </div>
          </Group>
        </Card>
      ))}
    </div>
  )
}

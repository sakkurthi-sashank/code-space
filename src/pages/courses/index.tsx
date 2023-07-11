import { CourseInfoCard } from '@/components/Course/CourseInfoCard'
import { EnrollNewCourse } from '@/components/Course/EnrollNewCourse'
import { useUser } from '@/hooks/useUser'
import { MainLayout } from '@/layout/MainLayout'
import { Flex } from '@mantine/core'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

interface Course {
  course_id: string
  course_name: string
  learning_tags: string[]
  course_code: string
  course_end_date: string
  course_start_date: string
  course_description: string
  professor_first_name: string
  professor_last_name: string
  validity: number
}

export default function CoursesPage() {
  const { user, loading } = useUser()
  const router = useRouter()

  const { data } = useQuery<Course[]>(
    ['course'],
    async () => {
      const response = await axios.get<Course[]>(
        'http://localhost:8080/api/v1/student-enrolled-courses',
        {},
      )
      return response.data!
    },
    {},
  )

  if (!user) {
    router.push('/sign-in')
  }

  if (user) {
    return (
      <MainLayout>
        <Flex wrap="wrap" gap="md" p={10}>
          {data?.map((course) => (
            <CourseInfoCard key={course.course_id} {...course} />
          ))}
        </Flex>
        <EnrollNewCourse />
      </MainLayout>
    )
  }
}

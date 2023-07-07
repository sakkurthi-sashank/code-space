import { CourseInfoCard } from '@/components/Course/CourseInfoCard'
import { EnrollNewCourse } from '@/components/Course/EnrollNewCourse'
import { MainLayout } from '@/layout/main-layout'
import { Flex } from '@mantine/core'
import axios from 'axios'
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
  const studentId = 'fc8cb36a-93fc-42a1-a43b-3384730295c7'

  const { data } = useQuery<Course[]>(['course'], async () => {
    const response = await axios.post<Course[]>(
      'http://localhost:8080/api/courses/get-courses-by-student-id',
      { studentId },
    )
    return response.data!
  })

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

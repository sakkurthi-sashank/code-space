import { InfoCard } from '@/components/Course/InfoCard'
import { useUserAuth } from '@/hooks/userAuthContext'
import { MainLayout } from '@/layouts/MainLayout'
import { Flex } from '@mantine/core'
import { useRouter } from 'next/router'

export default function CoursesPage() {
  const { user, loading } = useUserAuth()
  const router = useRouter()

  const data = [
    {
      id: '973de53a-2078-11ee-be56-0242ac120002',
      course_image:
        'https://www.codelivly.com/wp-content/uploads/2022/11/Few-Data-Structures-That-Every-Developer-Should-Master.jpg',
      learning_tags: ['Data Structures', 'Algorithms', 'C++'],
      course_name: 'Data Structures and Algorithms',
      course_description: 'ODD Semester | 2023 | 2nd Year | 3rd Semester | CSE',
      course_code: 'CSE 201L',
      course_professor: 'Dr. Sakkurthi Sashank',
      course_validity: 30,
    },
  ]

  if (!user && !loading) {
    router.push('/login')
  }

  if (user && !loading) {
    return (
      <MainLayout>
        <Flex className="flex-wrap p-2">
          {data.map((course) => (
            <InfoCard {...course} key={course.id} />
          ))}
        </Flex>
      </MainLayout>
    )
  }
}

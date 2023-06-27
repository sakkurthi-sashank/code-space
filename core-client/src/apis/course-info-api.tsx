import { supabase } from '@/lib/db'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export interface ICourse {
  id: string
  courseName: string
  courseUnqId: string
  courseDescription: string
  professorName: string
  learningTags: string[]
  courseStartDate: string
  courseEndDate: string
}

export const CourseInfoAPI = (studentId: string) => {
  const [data, setData] = useState<ICourse[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from('Course')
        .select(
          `
          id,
          courseName,
          courseUnqId,
          courseDescription,
          courseStartDate,
          professorName,
          courseEndDate,
          learningTags,
          createdAt,
          Enrollment (
            id,
            studentId,
            courseId,
            createdAt
          )
        `,
        )
        .eq('Enrollment.studentId', studentId)
      if (error) {
        router.push('/404')
        return
      }
      setData(data)
    }
    fetchCourses()
  }, [studentId, router])

  return { data }
}

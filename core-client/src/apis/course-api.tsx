import { supabase } from '@/utils/db'
import { useEffect, useState } from 'react'

export interface ICourse {
  id: string
  courseName: string
  courseDescription: string
  professorName: string
  learningTags: string[]
  courseStartDate: string
  courseEndDate: string
}

export const CourseAPI = (studentId: string) => {
  const [data, setData] = useState<ICourse[]>([])

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
        return
      }
      setData(data)
    }
    fetchCourses()
  }, [studentId])

  return { data }
}

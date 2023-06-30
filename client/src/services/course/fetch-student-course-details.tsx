import { supabase } from '@/lib/supabase'
import { dateFormatter } from '@/util/date-formatter'
import { useQuery, UseQueryResult } from 'react-query'

interface Course {
  id: string
  courseName: string
  courseCode: string
  learningTags: string[]
  professorName: string
  courseDescription: string
  courseStartDate: string
  courseEndDate: string
}

interface StudentCourseDetails extends Course {
  validity: number
}

interface FetchStudentCourseDetailsResult {
  data: StudentCourseDetails[] | undefined
  isLoading: boolean
  error: any
}

export const FetchStudentCourseDetails = ({
  studentId,
}: {
  studentId: string
}): FetchStudentCourseDetailsResult => {
  const { isLoading, error, data }: UseQueryResult<Course[], any> = useQuery(
    ['courses', studentId],
    async () => {
      const { data } = await supabase
        .from('Course')
        .select('*, StudentEnrolledCourse!inner(*)')
        .eq('StudentEnrolledCourse.studentId', studentId)
      return data
    },
  )

  const courses: StudentCourseDetails[] | undefined = data?.map(
    (course: Course) => {
      const courseStartDate = new Date(course.courseStartDate)
      const courseEndDate = new Date(course.courseEndDate)
      const today = new Date()
      const totalDays =
        (courseEndDate.getTime() - courseStartDate.getTime()) /
        (1000 * 3600 * 24)
      const remainingDays =
        (courseEndDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
      const validity = (remainingDays / totalDays) * 100

      return {
        ...course,
        courseStartDate: dateFormatter(courseStartDate),
        courseEndDate: dateFormatter(courseEndDate),
        validity,
      }
    },
  )

  return { data: courses, isLoading, error }
}

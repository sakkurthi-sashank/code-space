import { supabase } from '@/lib/supabase'
import { dateFormatter } from '@/util/date-formatter'
import { useQuery } from 'react-query'

export const FetchStudentCourseDetails = ({
  studentId,
}: {
  studentId: string
}) => {
  const { isLoading, error, data } = useQuery(
    ['courses', studentId],
    async () =>
      await supabase
        .from('Course')
        .select('*, StudentEnrolledCourse!inner(*)')
        .eq('StudentEnrolledCourse.studentId', studentId),
  )

  const courses = data?.data?.map((course) => {
    const courseStartDate = new Date(course.courseStartDate)
    const courseEndDate = new Date(course.courseEndDate)
    const today = new Date()
    const totalDays =
      (courseEndDate.getTime() - courseStartDate.getTime()) / (1000 * 3600 * 24)
    const remainingDays =
      (courseEndDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    const validity = (remainingDays / totalDays) * 100

    return {
      ...course,
      courseStartDate: dateFormatter(courseStartDate),
      courseEndDate: dateFormatter(courseEndDate),
      validity,
    }
  })

  return { data: courses, isLoading, error }
}

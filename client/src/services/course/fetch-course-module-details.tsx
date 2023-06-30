import { supabase } from '@/lib/supabase'
import { dateFormatter } from '@/util/date-formatter'
import { useQuery } from 'react-query'

export const FetchCourseModuleDetails = ({
  studentId,
  courseId,
}: {
  studentId: string
  courseId: string
}) => {
  const { isLoading, error, data } = useQuery(
    ['coursesModules', studentId, courseId],
    async () => {
      if (!studentId || !courseId) {
        return []
      }

      const { data } = await supabase
        .from('Course')
        .select('StudentEnrolledCourse!inner(*), CourseModule!inner(*)')
        .eq('StudentEnrolledCourse.studentId', studentId)
        .eq('CourseModule.courseId', courseId)
      return data
    },
  )

  if (isLoading) {
    return { data: [], isLoading, error }
  }

  const courseModuleDetails =
    data?.[0]?.CourseModule.map((item) => ({
      ...item,
      moduleStartDate: dateFormatter(item.moduleStartDate),
      moduleEndDate: dateFormatter(item.moduleEndDate),
    })) || []

  return { data: courseModuleDetails, isLoading, error }
}

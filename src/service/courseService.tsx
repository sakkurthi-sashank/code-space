import { supabase } from '@/lib/supabase'
import { useUserProfileStore } from '@/store/userProfileStore'
import { Course, StudentCourse } from '@/types/course'
import { dateFormatter } from '@/util/dateFormatter'
import { UseQueryResult, useQuery } from 'react-query'

export const useFetchStudentCourses = () => {
  const { userProfile } = useUserProfileStore((state) => state)

  const { isLoading, error, data }: UseQueryResult<Course[]> = useQuery(
    ['courses'],
    async () => {
      const user = userProfile?.id

      const { data, error } = await supabase
        .from('Course')
        .select(
          `*, UserEnrolledCourse!inner(user_id, created_at), Profile!inner(id, first_name, last_name)`,
        )
        .eq(
          'UserEnrolledCourse.user_id',
          '4dda6fdf-371f-49ff-9fcc-bec01dcadbc9',
        )
        .order('created_at', { ascending: true })

      if (error) {
        throw error
      }
      return data
    },
  )

  const transformData = (): StudentCourse[] | undefined => {
    if (data) {
      return data.map((course) => {
        const courseStartDate = new Date(course.start_date)
        const courseEndDate = new Date(course.end_date)
        const today = new Date()
        const totalDays =
          (courseEndDate.getTime() - courseStartDate.getTime()) /
          (1000 * 3600 * 24)
        const remainingDays =
          (courseEndDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
        const validity = 100 - (remainingDays / totalDays) * 100

        return {
          id: course.id,
          course_name: course.course_name,
          course_description: course.course_description,
          professor_name: `${course.Profile.first_name} ${course.Profile.last_name}`,
          course_code: course.course_code,
          course_uniq_id: course.course_uniq_id,
          start_date: dateFormatter(courseStartDate),
          end_date: dateFormatter(courseEndDate),
          learning_tags: course.learning_tags,
          validity,
        }
      })
    }
  }
  return { data: transformData(), isLoading, error }
}

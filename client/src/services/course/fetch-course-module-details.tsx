import { supabase } from '@/lib/supabase'
import { UseQueryResult, useQuery } from 'react-query'

interface CourseModule {
  id: string
  createdAt: string
  courseId: string
  moduleName: string
  moduleDescription: string
  moduleStartDate: string
  moduleEndDate: string
  isResultDisable: boolean
}

interface StudentEnrolledCourse {
  id: string
  createdAt: string
  studentId: string
  courseId: string
}

interface CourseModuleDetails {
  CourseModule: CourseModule[]
  StudentEnrolledCourse: StudentEnrolledCourse[]
}

interface FetchCourseModuleDetailsResult {
  isLoading: boolean
  error: any
  data: CourseModule[] | undefined
}

export const FetchCourseModuleDetails = ({
  courseId,
  studentId,
}: {
  courseId: string
  studentId: string
}): FetchCourseModuleDetailsResult => {
  const { isLoading, error, data }: UseQueryResult<CourseModuleDetails[], any> =
    useQuery(['courseModules', courseId], async () => {
      if (!studentId || !courseId) {
        return { CourseModule: [], StudentEnrolledCourse: [] }
      }

      const { data } = await supabase
        .from('Course')
        .select('StudentEnrolledCourse!inner(*), CourseModule!inner(*)')
        .eq('StudentEnrolledCourse.studentId', studentId)
        .eq('CourseModule.courseId', courseId)
      return data
    })

  const courseModules: CourseModule[] | undefined = data?.[0]?.CourseModule

  return { isLoading, error, data: courseModules }
}

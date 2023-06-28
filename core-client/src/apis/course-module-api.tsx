import { supabase } from '@/lib/db'
import { useEffect, useState } from 'react'

export interface IModule {
  id: string
  courseId: string
  contentName: string
  courseContentStartDate: string
  courseContentEndDate: string
}

export const CourseModuleAPI = (courseId: string) => {
  const [data, setData] = useState<IModule[]>([])

  useEffect(() => {
    const fetchCourseContent = async () => {
      const { data, error } = await supabase
        .from('CourseContent')
        .select('*')
        .eq('courseId', courseId)
      if (error) {
        return
      }
      setData(data)
    }
    if (courseId) {
      fetchCourseContent()
    }
  }, [courseId])
  return { data }
}

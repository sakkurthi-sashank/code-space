import { supabase } from '@/lib/db'
import { useEffect, useState } from 'react'

export interface ICourseContent {
  id: string
  courseId: string
  contentName: string
  courseContentStartDate: string
  courseContentEndDate: string
}

export const CourseContentAPI = (courseId: string) => {
  const [data, setData] = useState<ICourseContent[]>([])

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

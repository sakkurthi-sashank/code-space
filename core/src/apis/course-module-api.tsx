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
      const data = [
        {
          id: '1',
          courseId: '1',
          contentName: 'Introduction to Python',
          courseContentStartDate: '2021-08-01',
          courseContentEndDate: '2021-08-07',
        },
        {
          id: '2',
          courseId: '1',
          contentName: 'Python Data Types',
          courseContentStartDate: '2021-08-08',
          courseContentEndDate: '2021-08-14',
        },
      ]
      setData(data)
    }
    if (courseId) {
      fetchCourseContent()
    }
  }, [courseId])
  return { data }
}

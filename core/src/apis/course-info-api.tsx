import { ICourse } from '@/interface/course'
import { useEffect, useState } from 'react'

export const CourseInfoAPI = (studentId: string) => {
  const [data, setData] = useState<ICourse[]>([])

  useEffect(() => {
    const fetchCourses = async () => {
      const data = [
        {
          id: '1',
          courseName: 'Introduction to Python',
          courseUnqId: 'PY101',
          courseDescription: 'This is a course about Python',
          professorName: 'John Doe',
          learningTags: ['Python', 'Programming'],
          courseStartDate: '2021-08-01',
          courseEndDate: '2021-08-07',
          cousreValidityPeriod: 40,
          studentProgress: 50,
        },
        {
          id: '2',
          courseName: 'Introduction to Java',
          courseUnqId: 'JA101',
          courseDescription: 'This is a course about Java',
          professorName: 'John Doe',
          learningTags: ['Java', 'Programming'],
          courseStartDate: '2021-08-01',
          courseEndDate: '2021-08-07',
          cousreValidityPeriod: 40,
          studentProgress: 50,
        },
      ]
      setData(data)
    }
    fetchCourses()
  }, [studentId])

  return { data }
}

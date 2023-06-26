import { backendUrl } from '@/constants'
import { useQuery } from 'react-query'

export const CourseContentAPI = (courseId: String) => {
  const { isLoading, error, data } = useQuery(
    ['courseContents', courseId],
    async () =>
      await fetch(`${backendUrl}/courses/get-all-assignments-by-course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: courseId,
        }),
      }).then((res) => res.json()),
  )

  return { isLoading, error, data }
}

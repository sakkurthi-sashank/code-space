import { backendUrl } from '@/constants'
import { useQuery } from 'react-query'

export const courseAPI = (studentId: string) => {
  const { isLoading, error, data } = useQuery(
    ['courses', studentId],
    async () =>
      await fetch(`${backendUrl}/courses/get-all-courses-by-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: studentId,
        }),
      }).then((res) => res.json()),
  )
  return { isLoading, error, data }
}

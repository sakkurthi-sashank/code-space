import { Database } from '@/types/supabase'
import { Course, ProfileEnrolledCourse } from '@/types/types'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from 'react-query'

type CourseCards = Course & {
  profile_enrolled_course: ProfileEnrolledCourse[]
  module: {
    id: string
  }[]
}

export function useCourseQuery() {
  const user = useSession()?.user
  const supabaseClient = useSupabaseClient<Database>()

  const { data, error } = useQuery<CourseCards[], Error>(
    'courses',
    async () => {
      const { data, error } = await supabaseClient
        .from('course')
        .select(`*, profile_enrolled_course!inner(*), module(id)`)
        .filter('profile_enrolled_course.profile_id', 'eq', user?.id)
        .order('created_at', { ascending: false })

      return error ? [] : data || []
    },
    {
      enabled: !!user?.id,
    },
  )

  return { data: data || [], error }
}

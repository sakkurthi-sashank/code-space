import { Database } from '@/types/supabase'
import { Course, ProfileEnrolledCourse } from '@/types/types'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from 'react-query'

export function useFetchAdminCoursesFromSupabase() {
  const user = useSession()?.user
  const supabaseClient = useSupabaseClient<Database>()

  const { data, error, isLoading } = useQuery<Course[], Error>(
    'admin-courses',
    async () => {
      const { data, error } = await supabaseClient
        .from('course')
        .select('*')
        .order('created_at', { ascending: false })
      return error ? [] : data || []
    },
    {
      enabled: !!user?.id,
    },
  )

  return { data: data || [], error, isLoading }
}

type CourseCards = Course & {
  profile_enrolled_course: ProfileEnrolledCourse[]
  module: {
    id: string
  }[]
}

export function useFetchUserCoursesFromSupabase() {
  const user = useSession()?.user
  const supabaseClient = useSupabaseClient<Database>()

  const { data, error, isLoading } = useQuery<CourseCards[], Error>(
    'user-courses',
    async () => {
      const { data, error } = await supabaseClient
        .from('course')
        .select(`*, profile_enrolled_course!inner(*), module(id)`)
        .eq('profile_enrolled_course.profile_id', user?.id)
        .order('created_at', { ascending: false })

      return error ? [] : data || []
    },
    {
      enabled: !!user?.id,
    },
  )
  return { data: data || [], error, isLoading }
}

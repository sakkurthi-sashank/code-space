import { supabase } from '@/lib/supabase'

export const getCourse = async () => {
  const { data, error } = await supabase
    .from('Course')
    .select(
      `*, UserEnrolledCourse!inner(profile_id, created_at), Profile!inner(id, first_name as professor_first_name, last_name as professor_last_name)`,
    )
    .eq(
      'UserEnrolledCourse.profile_id',
      await supabase.auth.getUser()?.then((user) => user?.data.user?.id),
    )
    .order('created_at', { ascending: true })

  if (error) {
    throw error
  }
  return data
}

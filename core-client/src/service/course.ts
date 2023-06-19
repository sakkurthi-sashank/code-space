import { supabase } from '@/lib/supabase'

export const getAllCoursesByUserId = async (userId: string) => {
  const { data } = await supabase
    .from('courses')
    .select('*')
    .eq('user_id', userId)
  return data
}

export const getAllAssignmentsByCourseIdAndUserId = async (
  courseId: string,
  userId: string,
) => {
  const { data } = await supabase
    .from('assignments')
    .select('*')
    .eq('course_id', courseId)
    .eq('user_id', userId)
  return data
}

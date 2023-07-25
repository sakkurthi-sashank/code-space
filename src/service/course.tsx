import { supabase } from '@/libs/supabase'

export async function fetchCourseCardsData(userId: string) {
  const { data, error } = await supabase
    .from('course')
    .select(
      `
        id,
        course_image,
        course_name,
        course_description,
        course_code,
        learning_tags,
        professor:profile(
          id,
          display_name
        ),
        profile_enrolled_course!inner(
          id,
          profile_id,
          is_achieved
        )
      `,
    )
    .filter('profile_enrolled_course.profile_id', 'eq', userId)
    .order('course_name', { ascending: false })

  if (error) return

  return data
}

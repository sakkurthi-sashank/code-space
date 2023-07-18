import { supabase } from '@/libs/supabase'
import { create } from 'zustand'

interface CourseInfoCardData {
  id: string
  course_image: string
  course_name: string
  course_description: string
  course_code: string
  learning_tags: string[] | undefined
  profile: {
    id: string
    display_name: string
  } | null
  profile_enrolled_course: {
    id: string
    profile_id: string
    is_achieved: boolean | null
  }[]
}

interface CourseStore {
  courseInfoCardsData: CourseInfoCardData[] | null
  fetchCourseInfoCardsData: (userId: string) => Promise<void>
}

export const useCourseStore = create<CourseStore>((set) => ({
  courseInfoCardsData: [],

  fetchCourseInfoCardsData: async (userId: string) => {
    if (!userId) {
      return
    }

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
        profile!inner(
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

    if (error) {
      return
    }

    set({
      courseInfoCardsData: data,
    })
  },
}))

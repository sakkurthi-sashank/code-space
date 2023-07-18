import { supabase } from '@/libs/supabase'
import { Course, Profile, ProfileEnrolledCourse } from '@/types/types'
import { create } from 'zustand'

interface CourseData extends Course {
  profile: Profile | null
  profile_enrolled_course: ProfileEnrolledCourse[]
}

interface CourseStore {
  courseData: CourseData[] | null
  fetchCourses: (userId: string) => Promise<void>
}

export const useCourseStore = create<CourseStore>((set) => ({
  courseData: [],
  fetchCourses: async (userId: string) => {
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
      courseData: data,
    })
  },
}))

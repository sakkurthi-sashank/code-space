export interface Course {
  id: string
  course_image: string
  course_name: string
  course_description: string
  course_code: string
  learning_tags: string[]
  profile_enrolled_course: ProfileEnrolledCourse[]
  profile: Profile | null
}

export interface ProfileEnrolledCourse {
  id: string
  profile_id: string
  is_achieved: boolean | null
}

export interface Profile {
  id: string
  display_name: string
}

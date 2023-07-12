export interface Course {
  id: string
  course_name: string
  course_description: string
  created_at: string
  course_uniq_id: string
  course_code: string
  start_date: string
  end_date: string
  learning_tags: string[]
  professor_id: string
  UserEnrolledCourse: UserEnrolledCourse[]
  Profile: Profile
}

export interface Profile {
  id: string
  first_name: string
  last_name: string
}

export interface UserEnrolledCourse {
  user_id: string
  created_at: string
}

export interface StudentCourse {
  id: string
  course_name: string
  course_description: string
  start_date: string
  end_date: string
  validity: number
  professor_name: string
  course_code: string
  course_uniq_id: string
  learning_tags: string[]
}

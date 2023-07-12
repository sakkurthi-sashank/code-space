export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      CodingQuestion: {
        Row: {
          created_at: string | null
          id: string
          input_format: string | null
          marks: number | null
          module_id: string | null
          output_format: string | null
          problem_name: string
          problem_statement: string
        }
        Insert: {
          created_at?: string | null
          id: string
          input_format?: string | null
          marks?: number | null
          module_id?: string | null
          output_format?: string | null
          problem_name: string
          problem_statement: string
        }
        Update: {
          created_at?: string | null
          id?: string
          input_format?: string | null
          marks?: number | null
          module_id?: string | null
          output_format?: string | null
          problem_name?: string
          problem_statement?: string
        }
        Relationships: [
          {
            foreignKeyName: 'CodingQuestion_module_id_fkey'
            columns: ['module_id']
            referencedRelation: 'CourseModule'
            referencedColumns: ['id']
          },
        ]
      }
      Course: {
        Row: {
          course_code: string | null
          course_description: string | null
          course_name: string
          course_unq_code: number
          created_at: string | null
          end_date: string
          id: string
          learning_tags: string[]
          professor_id: string | null
          start_date: string
        }
        Insert: {
          course_code?: string | null
          course_description?: string | null
          course_name: string
          course_unq_code?: number
          created_at?: string | null
          end_date: string
          id: string
          learning_tags: string[]
          professor_id?: string | null
          start_date: string
        }
        Update: {
          course_code?: string | null
          course_description?: string | null
          course_name?: string
          course_unq_code?: number
          created_at?: string | null
          end_date?: string
          id?: string
          learning_tags?: string[]
          professor_id?: string | null
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: 'Course_professor_id_fkey'
            columns: ['professor_id']
            referencedRelation: 'Profile'
            referencedColumns: ['id']
          },
        ]
      }
      CourseModule: {
        Row: {
          course_id: string | null
          created_at: string | null
          end_date: string
          id: string
          is_full_screen_enabled: boolean | null
          is_result_disabled: boolean | null
          is_tab_switching_enabled: boolean | null
          module_description: string | null
          module_name: string
          module_unit: string | null
          start_date: string
          time_limit: number | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          end_date: string
          id: string
          is_full_screen_enabled?: boolean | null
          is_result_disabled?: boolean | null
          is_tab_switching_enabled?: boolean | null
          module_description?: string | null
          module_name: string
          module_unit?: string | null
          start_date: string
          time_limit?: number | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          end_date?: string
          id?: string
          is_full_screen_enabled?: boolean | null
          is_result_disabled?: boolean | null
          is_tab_switching_enabled?: boolean | null
          module_description?: string | null
          module_name?: string
          module_unit?: string | null
          start_date?: string
          time_limit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'CourseModule_course_id_fkey'
            columns: ['course_id']
            referencedRelation: 'Profile'
            referencedColumns: ['id']
          },
        ]
      }
      MCQQuestion: {
        Row: {
          correct_answer: string | null
          created_at: string | null
          id: string
          marks: number | null
          module_id: string | null
          options: string[]
          question_text: string
        }
        Insert: {
          correct_answer?: string | null
          created_at?: string | null
          id: string
          marks?: number | null
          module_id?: string | null
          options: string[]
          question_text: string
        }
        Update: {
          correct_answer?: string | null
          created_at?: string | null
          id?: string
          marks?: number | null
          module_id?: string | null
          options?: string[]
          question_text?: string
        }
        Relationships: [
          {
            foreignKeyName: 'MCQQuestion_module_id_fkey'
            columns: ['module_id']
            referencedRelation: 'CourseModule'
            referencedColumns: ['id']
          },
        ]
      }
      Profile: {
        Row: {
          admission_number: string
          batch: string
          branch: string
          created_at: string
          date_of_birth: string
          first_name: string
          gender: string
          id: string
          last_name: string
          phone_number: string
          profile_image: string | null
        }
        Insert: {
          admission_number: string
          batch: string
          branch: string
          created_at?: string
          date_of_birth: string
          first_name: string
          gender: string
          id: string
          last_name: string
          phone_number: string
          profile_image?: string | null
        }
        Update: {
          admission_number?: string
          batch?: string
          branch?: string
          created_at?: string
          date_of_birth?: string
          first_name?: string
          gender?: string
          id?: string
          last_name?: string
          phone_number?: string
          profile_image?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'Profile_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      ProfileCompletedCourseModule: {
        Row: {
          created_at: string | null
          id: string
          module_id: string
          status: boolean
        }
        Insert: {
          created_at?: string | null
          id: string
          module_id: string
          status: boolean
        }
        Update: {
          created_at?: string | null
          id?: string
          module_id?: string
          status?: boolean
        }
        Relationships: [
          {
            foreignKeyName: 'ProfileCompletedCourseModule_module_id_fkey'
            columns: ['module_id']
            referencedRelation: 'CourseModule'
            referencedColumns: ['id']
          },
        ]
      }
      TestCases: {
        Row: {
          created_at: string | null
          id: string
          input: string
          is_sample_testcase: boolean
          output: string
          question_id: string
        }
        Insert: {
          created_at?: string | null
          id: string
          input: string
          is_sample_testcase?: boolean
          output: string
          question_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          input?: string
          is_sample_testcase?: boolean
          output?: string
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'TestCases_question_id_fkey'
            columns: ['question_id']
            referencedRelation: 'CodingQuestion'
            referencedColumns: ['id']
          },
        ]
      }
      UserCompletedCodingQuestion: {
        Row: {
          coding_question_id: string | null
          completion_status: boolean | null
          created_at: string | null
          id: string
        }
        Insert: {
          coding_question_id?: string | null
          completion_status?: boolean | null
          created_at?: string | null
          id: string
        }
        Update: {
          coding_question_id?: string | null
          completion_status?: boolean | null
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'UserCompletedCodingQuestion_coding_question_id_fkey'
            columns: ['coding_question_id']
            referencedRelation: 'CodingQuestion'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'UserCompletedCodingQuestion_id_fkey'
            columns: ['id']
            referencedRelation: 'Profile'
            referencedColumns: ['id']
          },
        ]
      }
      UserCompletedCodingQuestionTestCases: {
        Row: {
          coding_question_id: string
          created_at: string | null
          id: string
          status: boolean | null
          test_case_id: string
        }
        Insert: {
          coding_question_id: string
          created_at?: string | null
          id: string
          status?: boolean | null
          test_case_id: string
        }
        Update: {
          coding_question_id?: string
          created_at?: string | null
          id?: string
          status?: boolean | null
          test_case_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'UserCompletedCodingQuestionTestCases_coding_question_id_fkey'
            columns: ['coding_question_id']
            referencedRelation: 'CodingQuestion'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'UserCompletedCodingQuestionTestCases_id_fkey'
            columns: ['id']
            referencedRelation: 'Profile'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'UserCompletedCodingQuestionTestCases_test_case_id_fkey'
            columns: ['test_case_id']
            referencedRelation: 'TestCases'
            referencedColumns: ['id']
          },
        ]
      }
      UserCompletedMCQQuestion: {
        Row: {
          answer_choice: string | null
          created_at: string | null
          id: string
          mcq_question_id: string
          status: boolean | null
        }
        Insert: {
          answer_choice?: string | null
          created_at?: string | null
          id: string
          mcq_question_id: string
          status?: boolean | null
        }
        Update: {
          answer_choice?: string | null
          created_at?: string | null
          id?: string
          mcq_question_id?: string
          status?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: 'UserCompletedMCQQuestion_id_fkey'
            columns: ['id']
            referencedRelation: 'Profile'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'UserCompletedMCQQuestion_mcq_question_id_fkey'
            columns: ['mcq_question_id']
            referencedRelation: 'MCQQuestion'
            referencedColumns: ['id']
          },
        ]
      }
      UserEnrolledCourse: {
        Row: {
          course_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'UserEnrolledCourse_course_id_fkey'
            columns: ['course_id']
            referencedRelation: 'Course'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'UserEnrolledCourse_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'Profile'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

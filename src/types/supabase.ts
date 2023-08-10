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
      coding_question: {
        Row: {
          created_at: string | null
          default_code: string | null
          id: string
          input_formate: string
          marks: number | null
          module_id: string
          output_formate: string
          problem_name: string
          problem_statement: string
        }
        Insert: {
          created_at?: string | null
          default_code?: string | null
          id?: string
          input_formate: string
          marks?: number | null
          module_id: string
          output_formate: string
          problem_name: string
          problem_statement: string
        }
        Update: {
          created_at?: string | null
          default_code?: string | null
          id?: string
          input_formate?: string
          marks?: number | null
          module_id?: string
          output_formate?: string
          problem_name?: string
          problem_statement?: string
        }
        Relationships: [
          {
            foreignKeyName: 'coding_question_module_id_fkey'
            columns: ['module_id']
            referencedRelation: 'module'
            referencedColumns: ['id']
          },
        ]
      }
      course: {
        Row: {
          course_code: string
          course_description: string
          course_image: string
          course_name: string
          created_at: string | null
          end_date: string | null
          id: string
          start_date: string | null
        }
        Insert: {
          course_code: string
          course_description: string
          course_image: string
          course_name: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
        }
        Update: {
          course_code?: string
          course_description?: string
          course_image?: string
          course_name?: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
        }
        Relationships: []
      }
      module: {
        Row: {
          course_id: string
          created_at: string | null
          duration: number
          end_date: string
          id: string
          module_name: string
          start_date: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          duration: number
          end_date: string
          id?: string
          module_name: string
          start_date: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          duration?: number
          end_date?: string
          id?: string
          module_name?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: 'module_course_id_fkey'
            columns: ['course_id']
            referencedRelation: 'course'
            referencedColumns: ['id']
          },
        ]
      }
      profile: {
        Row: {
          admission_number: string | null
          batch: number | null
          branch: string | null
          created_at: string | null
          display_name: string | null
          email_address: string
          id: string
          is_admin: boolean | null
          phone_number: string | null
          section: string | null
        }
        Insert: {
          admission_number?: string | null
          batch?: number | null
          branch?: string | null
          created_at?: string | null
          display_name?: string | null
          email_address: string
          id: string
          is_admin?: boolean | null
          phone_number?: string | null
          section?: string | null
        }
        Update: {
          admission_number?: string | null
          batch?: number | null
          branch?: string | null
          created_at?: string | null
          display_name?: string | null
          email_address?: string
          id?: string
          is_admin?: boolean | null
          phone_number?: string | null
          section?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'profile_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      profile_completed_coding_question: {
        Row: {
          coding_question_id: string
          created_at: string | null
          id: string
          is_submitted: boolean
          profile_id: string
        }
        Insert: {
          coding_question_id: string
          created_at?: string | null
          id?: string
          is_submitted: boolean
          profile_id: string
        }
        Update: {
          coding_question_id?: string
          created_at?: string | null
          id?: string
          is_submitted?: boolean
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profile_completed_coding_question_coding_question_id_fkey'
            columns: ['coding_question_id']
            referencedRelation: 'coding_question'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_completed_coding_question_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
        ]
      }
      profile_completed_module: {
        Row: {
          created_at: string | null
          id: string
          is_submitted: boolean | null
          module_id: string
          profile_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_submitted?: boolean | null
          module_id: string
          profile_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_submitted?: boolean | null
          module_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profile_completed_module_module_id_fkey'
            columns: ['module_id']
            referencedRelation: 'module'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_completed_module_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
        ]
      }
      profile_completed_test_case: {
        Row: {
          code_question_id: string
          created_at: string | null
          id: string
          is_correct: boolean
          profile_id: string
          test_case_id: string
        }
        Insert: {
          code_question_id: string
          created_at?: string | null
          id?: string
          is_correct: boolean
          profile_id: string
          test_case_id: string
        }
        Update: {
          code_question_id?: string
          created_at?: string | null
          id?: string
          is_correct?: boolean
          profile_id?: string
          test_case_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profile_completed_test_case_code_question_id_fkey'
            columns: ['code_question_id']
            referencedRelation: 'coding_question'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_completed_test_case_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_completed_test_case_test_case_id_fkey'
            columns: ['test_case_id']
            referencedRelation: 'test_case'
            referencedColumns: ['id']
          },
        ]
      }
      profile_enrolled_course: {
        Row: {
          course_id: string
          created_at: string | null
          id: string
          is_achieved: boolean | null
          profile_id: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          id?: string
          is_achieved?: boolean | null
          profile_id: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          id?: string
          is_achieved?: boolean | null
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profile_enrolled_course_course_id_fkey'
            columns: ['course_id']
            referencedRelation: 'course'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_enrolled_course_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
        ]
      }
      test_case: {
        Row: {
          coding_question_id: string
          created_at: string | null
          id: string
          input: string
          is_sample_test_case: boolean
          output: string
        }
        Insert: {
          coding_question_id: string
          created_at?: string | null
          id?: string
          input?: string
          is_sample_test_case?: boolean
          output?: string
        }
        Update: {
          coding_question_id?: string
          created_at?: string | null
          id?: string
          input?: string
          is_sample_test_case?: boolean
          output?: string
        }
        Relationships: [
          {
            foreignKeyName: 'test_case_coding_question_id_fkey'
            columns: ['coding_question_id']
            referencedRelation: 'coding_question'
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

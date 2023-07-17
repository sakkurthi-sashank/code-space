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
      course: {
        Row: {
          course_code: string
          course_description: string
          course_image: string
          course_name: string
          created_at: string | null
          id: string
          learning_tags: string[]
          professor_id: string
        }
        Insert: {
          course_code: string
          course_description: string
          course_image: string
          course_name: string
          created_at?: string | null
          id?: string
          learning_tags: string[]
          professor_id: string
        }
        Update: {
          course_code?: string
          course_description?: string
          course_image?: string
          course_name?: string
          created_at?: string | null
          id?: string
          learning_tags?: string[]
          professor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'course_professor_id_fkey'
            columns: ['professor_id']
            referencedRelation: 'profile'
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
          display_name: string
          email_address: string
          id: string
          is_professor: boolean | null
          phone_number: string | null
          section: string | null
        }
        Insert: {
          admission_number?: string | null
          batch?: number | null
          branch?: string | null
          created_at?: string | null
          display_name: string
          email_address: string
          id: string
          is_professor?: boolean | null
          phone_number?: string | null
          section?: string | null
        }
        Update: {
          admission_number?: string | null
          batch?: number | null
          branch?: string | null
          created_at?: string | null
          display_name?: string
          email_address?: string
          id?: string
          is_professor?: boolean | null
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

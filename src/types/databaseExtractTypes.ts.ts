import { Database } from '@/types/supabase'

type ExtractRowType<TableName extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][TableName]['Update']

export type Course = ExtractRowType<'course'>
export type Profile = ExtractRowType<'profile'>
export type CourseEnrollment = ExtractRowType<'course_enrollment'>
export type Module = ExtractRowType<'module'>
export type CodingQuestion = ExtractRowType<'coding_question'>
export type TestCase = ExtractRowType<'test_case'>
export type ProfileSubmittedCodingQuestion =
  ExtractRowType<'profile_submitted_coding_question'>
export type ProfileSubmittedCodingQuestionTestCase =
  ExtractRowType<'profile_submitted_test_case'>
export type ProfileSubmittedModule = ExtractRowType<'profile_submitted_module'>

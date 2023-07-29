import { Database } from '@/types/supabase'

type ExtractRowType<TableName extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][TableName]['Update']

export type Course = ExtractRowType<'course'>
export type Profile = ExtractRowType<'profile'>
export type Module = ExtractRowType<'module'>
export type CodingQuestion = ExtractRowType<'coding_question'>
export type TestCase = ExtractRowType<'test_case'>
export type ProfileCompletedCodingQuestion =
  ExtractRowType<'profile_completed_coding_question'>
export type ProfileCompletedModule = ExtractRowType<'profile_completed_module'>
export type ProfileEnrolledCourse = ExtractRowType<'profile_enrolled_course'>
export type ProfileCompletedTestCases =
  ExtractRowType<'profile_completed_test_case'>

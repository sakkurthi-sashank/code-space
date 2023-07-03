import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type CodingQuestion = {
  coding_question_id: Generated<string>;
  problem_name: string;
  problem_statement: string;
  input_format: string;
  output_format: string;
  section_id: string;
  created_at: Generated<Timestamp>;
};
export type Course = {
  course_id: Generated<string>;
  course_code: string;
  course_name: string;
  course_description: string;
  course_start_date: Timestamp;
  course_end_date: Timestamp;
  learning_tags: string[];
  created_at: Generated<Timestamp>;
  professor_id: string;
};
export type CourseModule = {
  course_module_id: Generated<string>;
  module_name: string;
  module_description: string;
  is_full_screen_enabled: Generated<boolean>;
  is_tab_switching_enabled: Generated<boolean>;
  module_unit: string;
  module_start_date: Timestamp;
  module_end_date: Timestamp;
  is_result_disabled: boolean;
  created_at: Generated<Timestamp>;
  course_id: string;
};
export type MCQQuestion = {
  mcq_question_id: Generated<string>;
  question_text: string;
  options: string[];
  correct_answer_choice: string;
  section_id: string;
  created_at: Generated<Timestamp>;
};
export type Professor = {
  professor_id: Generated<string>;
  first_name: string;
  last_name: string;
  image_url: string;
  email_address: string;
  hashed_password: string;
  phone_number: string;
  created_at: Generated<Timestamp>;
};
export type Section = {
  section_id: Generated<string>;
  section_name: string;
  is_retake_allowed: boolean;
  time_limit: number;
  retake_count: number;
  created_at: Generated<Timestamp>;
  course_module_id: string;
};
export type Student = {
  student_id: Generated<string>;
  first_name: string;
  last_name: string;
  image_url: string;
  email_address: string;
  hashed_password: string;
  admission_number: string;
  date_of_birth: Timestamp;
  gender: string;
  batch: string;
  branch: string;
  phone_number: string;
  created_at: Generated<Timestamp>;
};
export type StudentCompletedCodingQuestion = {
  student_id: string;
  coding_question_id: string;
  completion_status: boolean;
  created_at: Generated<Timestamp>;
};
export type StudentCompletedCodingQuestionTestCases = {
  student_id: string;
  coding_question_id: string;
  test_case_id: string;
  created_at: Generated<Timestamp>;
};
export type StudentCompletedCourseModule = {
  student_id: string;
  retake_count: number;
  course_module_id: string;
  completion_status: boolean;
  created_at: Generated<Timestamp>;
};
export type studentEnrolledCourse = {
  student_id: string;
  course_id: string;
  enrollment_status: boolean;
};
export type StudentMCQQuestion = {
  student_id: string;
  mcq_question_id: string;
  answer_choice: string;
  created_at: Generated<Timestamp>;
};
export type TestCases = {
  test_case_id: Generated<string>;
  test_case_input: string;
  test_case_output: string;
  is_sample_testcase: boolean;
  coding_question_id: string;
  created_at: Generated<Timestamp>;
};
export type DB = {
  CodingQuestion: CodingQuestion;
  Course: Course;
  CourseModule: CourseModule;
  MCQQuestion: MCQQuestion;
  Professor: Professor;
  Section: Section;
  Student: Student;
  StudentCompletedCodingQuestion: StudentCompletedCodingQuestion;
  StudentCompletedCodingQuestionTestCases: StudentCompletedCodingQuestionTestCases;
  StudentCompletedCourseModule: StudentCompletedCourseModule;
  studentEnrolledCourse: studentEnrolledCourse;
  StudentMCQQuestion: StudentMCQQuestion;
  TestCases: TestCases;
};
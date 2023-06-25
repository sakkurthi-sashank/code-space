import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Assignment = {
  id: string;
  courseId: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
};

export type AssignmentCompletion = {
  id: string;
  assignmentId: string;
  studentId: string;
  completedAt: Generated<Timestamp>;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
};

export type CodingQuestion = {
  id: string;
  questionTitle: string;
  questionDescription: string;
  answer: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  sectionId: string | null;
};

export type CodingQuestionStats = {
  id: string;
  codingQuestionId: string;
  assignmentCompletionId: string;
  isCorrect: boolean;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
};

export type Course = {
  id: string;
  courseId: string;
  courseName: string;
  courseDescription: string;
  professorName: string;
  learningTags: string[];
  courseStartDate: Timestamp;
  courseEndDate: Timestamp;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
};

export type Enrollment = {
  id: string;
  studentId: string;
  courseId: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
};

export type MCQQuestion = {
  id: string;
  questionTitle: string;
  options: string[];
  correctOption: number;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  sectionId: string;
};

export type Section = {
  id: string;
  assignmentId: string | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  sectionName: string;
};

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  admissionNumber: string;
  section: string;
  batch: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
};

export type TestCasePassed = {
  id: string;
  testCaseId: string;
  codingQuestionStatsId: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
};

export type TestCases = {
  id: string;
  input: string;
  output: string;
  isExample: Generated<boolean>;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  codingQuestionId: string;
};

export type DB = {
  Assignment: Assignment;
  AssignmentCompletion: AssignmentCompletion;
  CodingQuestion: CodingQuestion;
  CodingQuestionStats: CodingQuestionStats;
  Course: Course;
  Enrollment: Enrollment;
  MCQQuestion: MCQQuestion;
  Section: Section;
  Student: Student;
  TestCasePassed: TestCasePassed;
  TestCases: TestCases;
};

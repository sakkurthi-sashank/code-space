import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Assignment = {
  id: Generated<string>;
  contentName: string;
  assignmentStartDate: Timestamp;
  assignmentEndDate: Timestamp;
  courseId: string | null;
};
export type Course = {
  id: Generated<string>;
  courseId: string;
  courseName: string;
  courseDescription: string;
  professorName: string;
  learningTags: string[];
  courseStartDate: Timestamp;
  courseEndDate: Timestamp;
  createdAt: Generated<Timestamp>;
};
export type Enrollment = {
  id: Generated<string>;
  studentId: string;
  courseId: string;
  createdAt: Generated<Timestamp>;
};
export type Student = {
  id: Generated<string>;
  firstName: string;
  lastName: string;
  emailAddress: string;
  admissionNumber: string;
  section: string;
  batch: number;
  branch: string;
  createdAt: Generated<Timestamp>;
};
export type DB = {
  Assignment: Assignment;
  Course: Course;
  Enrollment: Enrollment;
  Student: Student;
};

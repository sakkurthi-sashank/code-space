import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

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
export type CourseContent = {
  id: Generated<string>;
  courseId: string;
  contentName: string;
  courseContentStartDate: Timestamp;
  courseContentEndDate: Timestamp;
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
  Course: Course;
  CourseContent: CourseContent;
  Enrollment: Enrollment;
  Student: Student;
};

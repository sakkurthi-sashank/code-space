import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Course = {
    id: Generated<string>;
    courseName: string;
    createdAt: Generated<Timestamp | null>;
    courseDescription: string | null;
    learningTags: string[];
    courseStartDate: Timestamp;
    courseEndDate: Timestamp;
    courseUnqId: string;
    professorName: string | null;
};
export type CourseContent = {
    id: Generated<string>;
    createdAt: Generated<Timestamp | null>;
    contentName: string;
    courseContentStartDate: Timestamp;
    courseContentEndDate: Timestamp;
    courseId: string;
};
export type Enrollment = {
    id: Generated<string>;
    createdAt: Generated<Timestamp | null>;
    studentId: string | null;
    courseId: string | null;
};
export type Student = {
    id: Generated<string>;
    firstName: string | null;
    lastName: string | null;
    emailAddress: string;
    admissionNumber: string;
    section: string | null;
    batch: string | null;
    branch: string | null;
    createdAt: Generated<Timestamp | null>;
};
export type DB = {
    Course: Course;
    CourseContent: CourseContent;
    Enrollment: Enrollment;
    Student: Student;
};

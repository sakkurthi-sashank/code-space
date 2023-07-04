import { db } from "../database";

export const getCourseModuleByCourseIdAndStudentIdRepository = async (
  courseId: string,
  studentId: string
) => {
  const data = await db
    .selectFrom("CourseModule")
    .selectAll("CourseModule")
    .where("CourseModule.course_id", "=", courseId)
    .innerJoin(
      "studentEnrolledCourse",
      "CourseModule.course_id",
      "studentEnrolledCourse.course_id"
    )
    .where("studentEnrolledCourse.student_id", "=", studentId)
    .execute();

  return data;
};

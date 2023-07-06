import { db } from "../database";

export const getCourseModuleByCourseIdAndStudentIdRepository = async (
  courseId: string,
  studentId: string
) => {
  const data = await db
    .selectFrom("CourseModule")
    .where("CourseModule.course_id", "=", courseId)
    .innerJoin(
      "studentEnrolledCourse",
      "CourseModule.course_id",
      "studentEnrolledCourse.course_id"
    )
    .where("studentEnrolledCourse.student_id", "=", studentId)
    .select([
      "CourseModule.module_id",
      "CourseModule.module_name",
      "CourseModule.module_unit",
      "CourseModule.module_start_date",
      "CourseModule.module_end_date",
      "CourseModule.is_result_disabled",
      "CourseModule.created_at",
      "CourseModule.course_id",
    ])
    .execute();

  return data;
};

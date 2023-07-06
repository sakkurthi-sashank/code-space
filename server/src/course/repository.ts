import { db } from "../database";

export const getCoursesByStudentIdRepository = async (studentId: string) => {
  const data = await db
    .selectFrom("Course")
    .leftJoin("Professor", "Course.professor_id", "Professor.professor_id")
    .leftJoin(
      "studentEnrolledCourse",
      "Course.course_id",
      "studentEnrolledCourse.course_id"
    )
    .where("studentEnrolledCourse.student_id", "=", studentId)
    .select([
      "Course.course_id",
      "Course.course_name",
      "Professor.first_name as professor_first_name",
      "Professor.last_name as professor_last_name",
      "Course.learning_tags",
      "Course.course_code",
      "Course.course_end_date",
      "Course.course_start_date",
      "Course.course_description",
    ])
    .execute();

  return data;
};

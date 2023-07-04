import { db } from "../database";

export const getCoursesByStudentIdRepository = async (studentId: string) => {
  const data = await db
    .selectFrom(["Course", "Professor"])
    .select([
      "Course.course_id",
      "Course.course_name",
      "Professor.first_name",
      "Professor.last_name",
      "Course.learning_tags",
      "Course.course_code",
      "Course.course_end_date",
      "Course.course_start_date",
      "Course.course_description",
    ])
    .leftJoin("Professor", "Course.professor_id", "Professor.professor_id")
    .leftJoin(
      "studentEnrolledCourse",
      "Course.course_id",
      "studentEnrolledCourse.course_id"
    )
    .where("studentEnrolledCourse.student_id", "=", studentId)
    .execute();

  return data;
};

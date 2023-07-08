import { db } from "../database";
import { dateFormatter } from "../utils/date-formatter";

export const getCoursesByUserIdService = async (studentId: string) => {
  try {
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

    const courses = data?.map((course) => {
      const course_start_date = new Date(course.course_start_date);
      const course_end_date = new Date(course.course_end_date);
      const today = new Date();

      const totalDuration =
        course_end_date.getTime() - course_start_date.getTime();
      const remainingDuration = course_end_date.getTime() - today.getTime();
      const validity = 100 - (remainingDuration / totalDuration) * 100;

      return {
        ...course,
        course_start_date: dateFormatter(course_start_date),
        course_end_date: dateFormatter(course_end_date),
        validity,
      };
    });

    return courses;
  } catch (error) {
    return error;
  }
};

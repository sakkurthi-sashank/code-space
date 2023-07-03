import { db } from "../database";
import { dateFormatter } from "../utils/date-formatter";

export const getCoursesByUserIdService = async (studentId: string) => {
  try {
    const data = await db
      .selectFrom("Course")
      .innerJoin("Professor", "Course.professor_id", "Professor.professor_id")
      .innerJoin(
        "studentEnrolledCourse",
        "Course.course_id",
        "studentEnrolledCourse.course_id"
      )
      .where("studentEnrolledCourse.student_id", "=", studentId)
      .select([
        "Course.course_id",
        "course_name",
        "Professor.first_name",
        "Professor.last_name",
        "Course.learning_tags",
        "Course.course_code",
        "Course.course_end_date",
        "course_start_date",
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
        professor_first_name: course.first_name,
        professor_last_name: course.last_name,
        validity,
      };
    });

    return courses;
  } catch (error) {
    return error;
  }
};

export const getCourseModulesByCourseIdAndStudentIdService = async (
  courseId: string,
  studentId: string
) => {
  try {
    const data = await db
      .selectFrom("Course")
      .where("Course.course_id", "=", courseId)
      .innerJoin(
        "studentEnrolledCourse",
        "Course.course_id",
        "studentEnrolledCourse.course_id"
      )
      .where("studentEnrolledCourse.student_id", "=", studentId)
      .innerJoin("CourseModule", "Course.course_id", "CourseModule.course_id")
      .selectAll("CourseModule")
      .execute();

    const courseModules = data?.map((courseModule) => {
      const course_module_start_date = new Date(courseModule.module_start_date);
      const course_module_end_date = new Date(courseModule.module_end_date);

      return {
        ...courseModule,
        module_start_date: dateFormatter(course_module_start_date),
        module_end_date: dateFormatter(course_module_end_date),
      };
    });

    return courseModules;
  } catch (error) {
    return error;
  }
};

import { dateFormatter } from "../utils/date-formatter";
import { db } from "../database";

export const getCourseModulesService = async (
  courseId: string,
  studentId: string
) => {
  try {
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
        "CourseModule.module_start_date",
        "CourseModule.module_end_date",
      ])
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

export const getModuleDetailsService = async (moduleId: string) => {
  try {
    const data = await db
      .selectFrom("CourseModule")
      .where("CourseModule.module_id", "=", moduleId)
      .innerJoin(
        "CodingQuestion",
        "CourseModule.module_id",
        "CodingQuestion.module_id"
      )
      .innerJoin(
        "MCQQuestion",
        "CourseModule.module_id",
        "MCQQuestion.module_id"
      )
      .select((eb) => [
        "CourseModule.module_id",
        "CourseModule.module_name",
        "CourseModule.module_start_date",
        "CourseModule.module_end_date",
        eb.fn
          .count("CodingQuestion.coding_question_id")
          .as("coding_question_count"),
        eb.fn.count("MCQQuestion.mcq_question_id").as("mcq_question_count"),
      ])
      .execute();

    const moduleDetails = data?.map((module) => {
      const module_start_date = new Date(module.module_start_date);
      const module_end_date = new Date(module.module_end_date);

      return {
        ...module,
        module_start_date: dateFormatter(module_start_date),
        module_end_date: dateFormatter(module_end_date),
      };
    });

    return moduleDetails;
  } catch (error) {
    return error;
  }
};

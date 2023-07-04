import { dateFormatter } from "../utils/date-formatter";
import { getCourseModuleByCourseIdAndStudentIdRepository } from "./repository";

export const getCourseModuleByCourseIdAndStudentIdService = async (
  courseId: string,
  studentId: string
) => {
  try {
    const data = await getCourseModuleByCourseIdAndStudentIdRepository(
      courseId,
      studentId
    );

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

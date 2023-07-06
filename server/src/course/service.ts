import { dateFormatter } from "../utils/date-formatter";
import { getCoursesByStudentIdRepository } from "./repository";

export const getCoursesByUserIdService = async (studentId: string) => {
  try {
    const data = await getCoursesByStudentIdRepository(studentId);
    /**
     *  Map through the data and format the date
     */
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
    console.log(error);

    return error;
  }
};

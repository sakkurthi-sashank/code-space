import { Request, Response } from "express";
import { db } from "../../database";
import { dateFormatter } from "../../util/date-formatter";

export const getCoursesByUserId = async (req: Request, res: Response) => {
  const { studentId } = req.body;
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
      const totalDays =
        (course_end_date.getTime() - course_start_date.getTime()) /
        (1000 * 3600 * 24);
      const remainingDays =
        (course_end_date.getTime() - today.getTime()) / (1000 * 3600 * 24);
      const validity = (remainingDays / totalDays) * 100;

      return {
        ...course,
        course_start_date: dateFormatter(course_start_date),
        course_end_date: dateFormatter(course_end_date),
        professor_first_name: course.first_name,
        professor_last_name: course.last_name,
        validity,
      };
    });

    res.json(courses);
  } catch (error) {
    res.json(error);
  }
};

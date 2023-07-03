import {
  getCourseModulesByCourseIdAndStudentIdService,
  getCoursesByUserIdService,
} from "../services/courseService";
import { Request, Response } from "express";

export const getCoursesByUserId = async (req: Request, res: Response) => {
  const { studentId } = req.body;
  try {
    const courses = await getCoursesByUserIdService(studentId);
    res.json(courses);
  } catch (error) {
    res.json(error);
  }
};

export const getCourseModulesByCourseIdAndStudentId = async (
  req: Request,
  res: Response
) => {
  const { courseId, studentId } = req.body;
  try {
    const courses = await getCourseModulesByCourseIdAndStudentIdService(
      courseId,
      studentId
    );
    res.json(courses);
  } catch (error) {
    res.json(error);
  }
};

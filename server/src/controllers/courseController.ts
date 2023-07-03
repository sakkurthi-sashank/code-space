import {
  getBriefModuleDetailsByModuleIdService,
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

export const getBriefModuleDetailsByModuleId = async (
  req: Request,
  res: Response
) => {
  const { moduleId } = req.body;
  try {
    const module = await getBriefModuleDetailsByModuleIdService(moduleId);
    res.json(module);
  } catch (error) {
    res.json(error);
  }
};

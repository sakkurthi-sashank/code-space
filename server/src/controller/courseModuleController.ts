import { Request, Response } from "express";
import {
  getCourseModuleByCourseIdAndStudentIdService,
  getModuleDetailsByModuleIdService,
} from "../service/courseModuleService";

export const getCourseModuleByCourseIdAndStudentIdController = async (
  req: Request,
  res: Response
) => {
  const { courseId, studentId } = req.params;

  try {
    const courseModuleData = await getCourseModuleByCourseIdAndStudentIdService(
      courseId,
      studentId
    );
    res.status(200).json(courseModuleData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getModuleDetailsByModuleIdController = async (
  req: Request,
  res: Response
) => {
  const { moduleId } = req.params;

  try {
    const moduleDetails = await getModuleDetailsByModuleIdService(moduleId);
    res.status(200).json(moduleDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

import { Request, Response } from "express";
import {
  getCourseModulesService,
  getModuleDetailsService,
} from "../service/courseModuleService";

export const getCourseModulesController = async (
  req: Request,
  res: Response
) => {
  const { courseId } = req.params;
  const { studentId } = res.locals;

  try {
    const courseModuleData = await getCourseModulesService(courseId, studentId);
    res.status(200).json(courseModuleData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getModuleDetailsController = async (
  req: Request,
  res: Response
) => {
  const { moduleId } = req.params;

  try {
    const moduleDetails = await getModuleDetailsService(moduleId);
    res.status(200).json(moduleDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

import { Request, Response } from "express";
import { getCourseModuleByCourseIdAndStudentIdService } from "./service";

export const getCourseModuleByCourseIdAndStudentIdController = async (
  req: Request,
  res: Response
) => {
  const { courseId, studentId } = req.body;

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

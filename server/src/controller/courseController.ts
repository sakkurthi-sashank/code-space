import { Request, Response } from "express";
import { getCoursesService } from "../service/courseService";

export const getCoursesController = async (_req: Request, res: Response) => {
  try {
    const { uid: studentId } = res.locals;

    const coursesData = await getCoursesService(studentId);

    res.status(200).json(coursesData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

import { getCoursesByUserIdService } from "../services/courseService";
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

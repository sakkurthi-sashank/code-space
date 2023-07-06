import { Request, Response } from "express";
import { getCoursesByUserIdService } from "./service";

export const getCoursesByStudentIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { studentId } = req.body;

    const coursesData = await getCoursesByUserIdService(studentId);

    res.status(200).json(coursesData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

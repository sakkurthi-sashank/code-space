import { Request, Response } from "express";
import { getCoursesByUserIdService } from "../service/courseService";

export const getCoursesByStudentIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { studentId } = req.params;

    const coursesData = await getCoursesByUserIdService(studentId);

    res.status(200).json(coursesData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

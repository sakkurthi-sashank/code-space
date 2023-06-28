import express from "express";
import { Request, Response } from "express";
import { db, redisClient } from "../lib/db";

const router = express.Router();

router.get("/get-courses-by-user-id", async (req: Request, res: Response) => {
  const { studentId } = req.body;

  if (!studentId) {
    return res.status(400).json({ message: "Missing studentId" });
  }

  try {
    const cachedCourses = await redisClient.get(studentId);

    if (cachedCourses === null) {
      const courses = await db
        .selectFrom("Course")
        .innerJoin("Enrollment", "Course.id", "Enrollment.courseId")
        .where("Enrollment.studentId", "=", studentId)
        .selectAll("Course")
        .execute();

      await redisClient.setEx(studentId, 300, JSON.stringify(courses));
      return res.status(200).json({ courses });
    } else {
      const courses = JSON.parse(cachedCourses);
      return res.status(200).json({ courses });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

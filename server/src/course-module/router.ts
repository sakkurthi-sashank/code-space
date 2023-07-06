import express from "express";
import { getCourseModuleByCourseIdAndStudentIdController } from "./controller";

export const router = express.Router();

router.post(
  "/get-course-modules-by-course-id-and-student-id",
  getCourseModuleByCourseIdAndStudentIdController
);

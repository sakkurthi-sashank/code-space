import express from "express";
import { getCoursesByStudentIdController } from "./controller";

export const router = express.Router();

router.post("/get-courses-by-student-id", getCoursesByStudentIdController);

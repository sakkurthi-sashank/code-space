import express from "express";
import { getCoursesByStudentIdController } from "./controller";

export const router = express.Router();

router.get("/get-courses-by-student-id", getCoursesByStudentIdController);

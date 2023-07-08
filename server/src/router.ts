import express from "express";
import {
  getCourseModuleByCourseIdAndStudentIdController,
  getModuleDetailsByModuleIdController,
} from "./controller/courseModuleController";
import { getCoursesByStudentIdController } from "./controller/courseController";

export const router = express.Router();

router.get("/courses-enrolled/:studentId", getCoursesByStudentIdController);

router.get(
  "/course-modules/:courseId/:studentId",
  getCourseModuleByCourseIdAndStudentIdController
);

router.get("/module-details/:moduleId", getModuleDetailsByModuleIdController);

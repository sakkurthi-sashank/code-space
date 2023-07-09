import express from "express";
import { getCoursesController } from "./controller/courseController";
import {
  getCourseModulesController,
  getModuleDetailsController,
} from "./controller/courseModuleController";

export const router = express.Router();

router.post("/user/create");

router.get("/course/student-enrolled-courses", getCoursesController);
router.get("/course/course-modules/:courseId", getCourseModulesController);
router.get("/course/module-details/:moduleId", getModuleDetailsController);

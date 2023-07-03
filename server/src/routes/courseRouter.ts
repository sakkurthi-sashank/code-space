import express from "express";
import { getCoursesByUserId } from "../controllers/courseController";

export const router = express.Router();

router.post("/get-courses-by-user-id", getCoursesByUserId);
router.post("/create-course-by-admin");

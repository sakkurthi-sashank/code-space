import express from "express";
import { getCoursesByUserId } from "./service";

export const router = express.Router();

router.post("/get-courses-by-user-id", getCoursesByUserId);
router.post("/create-course-by-admin");

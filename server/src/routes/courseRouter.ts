import express from "express";
import {
  getCourseModulesByCourseIdAndStudentId,
  getCoursesByUserId,
} from "../controllers/courseController";

export const router = express.Router();

/**
 * @swagger
 * /api/v1/course/get-courses-by-student-id:
 *   post:
 *     description: Get courses by student id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: "string"
 *             required:
 *               - studentId
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/get-courses-by-student-id", getCoursesByUserId);

/**
 * @swagger
 * /api/v1/course/get-course-modules-by-course-id-and-student-id:
 *   post:
 *     description: Get course modules by course id and student id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 example: "string"
 *               studentId:
 *                 type: string
 *                 example: "string"
 *             required:
 *               - courseId
 *               - studentId
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post(
  "/get-course-modules-by-course-id-and-student-id",
  getCourseModulesByCourseIdAndStudentId
);

export default router;

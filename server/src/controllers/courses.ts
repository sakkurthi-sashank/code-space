import express from 'express';
import {
  getAllAssignmentsByCourse,
  getAllCoursesByUser,
} from '../services/course';

const router = express.Router();

router.post('/get-all-courses-by-user', getAllCoursesByUser);
router.post('/get-all-assignments-by-course', getAllAssignmentsByCourse);

export { router as courseController };

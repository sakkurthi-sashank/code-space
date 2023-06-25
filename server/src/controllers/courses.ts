import express from 'express';
import { getAllCoursesByUser } from '../services/course';

const router = express.Router();

router.get('/get-all-courses-by-user', getAllCoursesByUser);

export { router as courseController };

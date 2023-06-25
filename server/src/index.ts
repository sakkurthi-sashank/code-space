import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

import { courseController } from './controllers/courses';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/courses', courseController);
// app.use('/profile', profileController);

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});

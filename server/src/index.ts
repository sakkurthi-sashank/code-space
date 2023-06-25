import dotenv from 'dotenv';
import express from 'express';
import { courseController } from './controllers/courses';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/courses', courseController);
// app.use('/profile', profileController);

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});

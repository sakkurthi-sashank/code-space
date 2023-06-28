import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.APP_PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

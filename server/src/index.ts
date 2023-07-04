import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { router as courseRouter } from "./course/router";
import { router as courseModuleRouter } from "./course-module/router";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/course", courseRouter);
app.use("/api/course-module", courseModuleRouter);

app.get("/", (_req, res) => {
  res.send({
    app_status: "running",
  });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

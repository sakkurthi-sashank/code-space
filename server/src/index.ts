import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import admin from "firebase-admin";
dotenv.config();

import { router as courseRouter } from "./course/router";
import { router as courseModuleRouter } from "./course-module/router";

const app = express();
const serviceAccount = require("../serviceAccountKey.json");

app.use(
  cors({
    origin: "*",
  })
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/courses", courseRouter);
app.use("/api/course-module", courseModuleRouter);

app.get("/", (_req, res) => {
  res.send({
    app_status: "running",
  });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

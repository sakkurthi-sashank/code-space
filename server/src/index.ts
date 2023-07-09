import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import admin from "firebase-admin";
dotenv.config();

import { router } from "./router";

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

app.use(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({
      message: "Unauthorized: No token provided.",
    });
    return;
  }
  const token = authorization.split(" ")[1];
  console.log(token);

  const data = await admin.auth().verifyIdToken(token);

  console.log(data);
});

app.use("/api/v1", router);

app.get("/", (_req, res) => {
  res.send({
    app_status: "running",
  });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

import express from "express";
//import data from "./data.js";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import aboutRouter from "./routes/aboutRoutes.js";
import workRouter from "./routes/workRoutes.js";
import skillRouter from "./routes/skilRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import experienceRouter from "./routes/experienceRoute.js";
import userRouter from "./routes/userRoutes.js";

import uploadRouter from "./routes/uploadRoutes.js";
import dashboardRouter from "./routes/dashboarRoutes.js";
import contactRouter from "./routes/contactRoutes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/contacts", contactRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/seed", seedRouter);
app.use("/api/abouts", aboutRouter);
app.use("/api/works", workRouter);
app.use("/api/skills", skillRouter);
app.use("/api/experiences", experienceRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/users", userRouter);
app.use("/api/dashboards", dashboardRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});

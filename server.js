import express from "express";
import connectDB from "./db/connect.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";

import "express-async-errors";
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  throw new Error("Test");
  res.send("Welcome!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log("App is running on port: ", port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

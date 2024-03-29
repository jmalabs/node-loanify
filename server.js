import express from "express";
import connectDB from "./db/connect.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobRoutes.js";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Security Packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

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

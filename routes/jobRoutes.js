import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
} from "../controllers/jobsController.js";

import express from "express";
import authenticateMiddleware from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .post(authenticateMiddleware, createJob)
  .get(authenticateMiddleware, getAllJobs);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteJob).patch(updateJob);

export default router;

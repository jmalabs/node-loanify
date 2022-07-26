import Job from "../models/Job.js";
import { BadRequestError } from "../Errors/index.js";
import { StatusCodes } from "http-status-codes";
const createJob = async (req, res) => {
  const { company, position } = req.body;

  if (!company || !position) {
    throw BadRequestError("Please provide values!");
  }

  const jobRequest = { company, position, createdBy: req.user.userId };
  const job = await Job.create(jobRequest);
  res.status(StatusCodes.CREATED).send(job);
};

const deleteJob = async (req, res) => {
  res.send("Delete Job");
};

const getAllJobs = async (req, res) => {
  res.send("Get all Jobs");
};

const updateJob = async (req, res) => {
  res.send("Update Jobs");
};

const showStats = async (req, res) => {
  res.send("Show Stats");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };

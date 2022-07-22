// {createJob, deleteJob, getAllJobs, updateJob, showStats}

const createJob = async (req, res) => {
  res.send("Create Job");
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

import Job from '../models/JobSchema.js';

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const createJob = async (req, res) => {
  try {
    const { nameCleaner, roomNumber, nameHotel, scheduledTime } = req.body;
    const newJob = new Job({ nameCleaner, roomNumber, nameHotel, scheduledTime });
    const job = await newJob.save();
    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

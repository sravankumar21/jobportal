import asyncHandler from 'express-async-handler';
import Job from '../models/jobModel.js';

// Get all jobs
export const getAllJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post a Job
export const postJob = asyncHandler(async (req, res) => {
  try {
    const {
      jobTitle,
      jobType,
      jobDescription,
      companyName,
      companyURL,
      workType,
      payScale,
      skills,
    } = req.body;

    let job = new Job({
      jobTitle,
      jobType,
      jobDescription,
      companyName,
      companyURL,
      workType,
      payScale,
      skills,
    });

    job = await job.save();
    res.status(201).json({ id: job._id, job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get Job by Id
export const getJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404);
      throw new Error('No job with this Id');
    }

    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Job by Id
export const updateJob = asyncHandler(async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      res.status(404);
      throw new Error('No job with this Id');
    }

    res.status(200).json({ job: updatedJob });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a Job by Id
export const deleteJob = asyncHandler(async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      res.status(404);
      throw new Error('No job with this Id');
    }

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

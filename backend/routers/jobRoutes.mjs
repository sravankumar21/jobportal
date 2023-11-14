import express from 'express';
import {
  getAllJobs,
  getJob,
  postJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';

const router = express.Router();

// Get all jobs
router.route('/').get(getAllJobs);

// Post a job
router.route('/add-job').post(postJob);

// Get a job by ID
router.route('/:id').get(getJob);

// Update a job by ID
router.route('/update-job/:id').patch(updateJob);

// Delete a job by ID
router.route('/delete-job/:id').delete(deleteJob);

export default router;

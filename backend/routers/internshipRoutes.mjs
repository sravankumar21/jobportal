// backend/routers/internshipRoutes.mjs

import express from 'express';
import {
  getAllInternships,
  getInternship,
  postInternship,
  updateInternship,
  deleteInternship,
} from '../controllers/internshipController.js';

const router = express.Router();

// Get all internships
router.route('/').get(getAllInternships);

// Get an internship by ID
router.route('/:id').get(getInternship);

// Create an internship
router.route('/add-internship').post(postInternship);

// Update an internship by ID
router.route('/update-internship/:id').patch(updateInternship);

// ...
// Delete an internship by ID
router.route('/:id').delete(deleteInternship);
// ...


export default router;

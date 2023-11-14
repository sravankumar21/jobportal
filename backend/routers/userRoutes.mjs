// userRoutes.js
import express from 'express';
import { addStudentUser, updateStudentUser, deleteStudentUser } from '../controllers/userController.js';

const router = express.Router();

// Route to add a student user
router.post('/add-student', addStudentUser);

// Route to update a student user
router.patch('/update-student/:id', updateStudentUser);

// Route to delete a student user
router.delete('/delete-student/:id', deleteStudentUser);

export default router;

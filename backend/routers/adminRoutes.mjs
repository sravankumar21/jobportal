// routers/adminRoutes.mjs
import express from 'express';
// adminRoutes.mjs
import { addAdminUser, updateAdminUser, deleteAdminUser } from '../controllers/adminController.js';
import { adminLogin } from '../controllers/adminController.js';  // Add this line for adminLogin


const router = express.Router();

// Route for admin login
router.post('/login', adminLogin);
router.post('/add-admin', addAdminUser);
router.patch('/update-admin/:id', updateAdminUser);
router.delete('/delete-admin/:id', deleteAdminUser);

export default router;

// backend/routers/skillDevelopmentRoutes.mjs

import express from 'express';
import {
  getAllSkillDevelopment,
  getSkillDevelopment,
  postSkillDevelopment,
  updateSkillDevelopment,
  deleteSkillDevelopment,
} from '../controllers/skillDevelopmentController.js';

const router = express.Router();

router.route('/').get(getAllSkillDevelopment);
router.route('/:id').get(getSkillDevelopment);

// Modified route to handle multiple course details and an image
router.route('/add-skill-development').post(postSkillDevelopment);

router.route('/update-skill-development/:id').patch(updateSkillDevelopment);
router.route('/delete-skill-development/:id').delete(deleteSkillDevelopment);

export default router;

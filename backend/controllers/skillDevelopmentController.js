// backend/controllers/skillDevelopmentController.js

import asyncHandler from 'express-async-handler';
import SkillDevelopment from '../models/skillDevelopmentModel.js';

export const getAllSkillDevelopment = asyncHandler(async (req, res) => {
  try {
    const skillDevelopments = await SkillDevelopment.find();
    res.status(200).json({ skillDevelopments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export const postSkillDevelopment = asyncHandler(async (req, res) => {
  try {
    const { title, description, courseinstructor, courselink, coursetype } = req.body;

    const skillDevelopment = new SkillDevelopment({
      title,
      description,
      courseinstructor,
      courselink,
      coursetype,
    });

    const savedSkillDevelopment = await skillDevelopment.save();
    res.status(201).json(savedSkillDevelopment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getSkillDevelopment = asyncHandler(async (req, res) => {
  try {
    console.log('Received Skill Development ID:', req.params.id);
    const skillDevelopment = await SkillDevelopment.findById(req.params.id);

    if (!skillDevelopment) {
      res.status(404);
      throw new Error('No skill development content with this ID');
    }

    res.status(200).json(skillDevelopment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const updateSkillDevelopment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Received Skill Development ID for update:', id);

    const updatedSkillDevelopment = await SkillDevelopment.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedSkillDevelopment) {
      console.log('No skill development content found with ID:', id);
      res.status(404);
      throw new Error('No skill development content with this ID');
    }

    console.log('Skill Development content updated successfully:', updatedSkillDevelopment);
    res.status(200).json(updatedSkillDevelopment);
  } catch (error) {
    console.error('Error updating skill development content:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export const deleteSkillDevelopment = asyncHandler(async (req, res) => {
  try {
    const deletedSkillDevelopment = await SkillDevelopment.findByIdAndDelete(req.params.id);

    if (!deletedSkillDevelopment) {
      res.status(404);
      throw new Error('No skill development content with this ID');
    }

    res.status(200).json({ message: 'Skill Development content deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

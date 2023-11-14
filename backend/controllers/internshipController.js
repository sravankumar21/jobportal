// backend/controllers/internshipController.mjs

import asyncHandler from 'express-async-handler';
import Internship from '../models/internshipModel.js';

// Get all internships
export const getAllInternships = asyncHandler(async (req, res) => {
  try {
    const internships = await Internship.find();
    res.status(200).json({ internships });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post an Internship
export const postInternship = asyncHandler(async (req, res) => {
  try {
    const {
      internshipTitle,
      internshipType,
      internshipDescription,
      companyName,
      companyURL,
      duration,
      skillsRequired,
    } = req.body;

    const internship = new Internship({
      internshipTitle,
      internshipType,
      internshipDescription,
      companyName,
      companyURL,
      duration,
      skillsRequired,
    });

    const savedInternship = await internship.save();
    res.status(201).json(savedInternship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Internship by Id
export const getInternship = asyncHandler(async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      res.status(404);
      throw new Error('No internship with this Id');
    }

    res.status(200).json(internship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Internship by Id
export const updateInternship = asyncHandler(async (req, res) => {
  try {
    const updatedInternship = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedInternship) {
      res.status(404);
      throw new Error('No internship with this Id');
    }

    res.status(200).json(updatedInternship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Internship by Id
export const deleteInternship = asyncHandler(async (req, res) => {
  try {
    const deletedInternship = await Internship.findByIdAndDelete(req.params.id);

    if (!deletedInternship) {
      res.status(404);
      throw new Error('No internship with this Id');
    }

    res.status(200).json({ message: 'Internship deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

import asyncHandler from 'express-async-handler';
import Internship from '../models/internshipModel.js';

export const getAllInternships = asyncHandler(async (req, res) => {
  try {
    const internships = await Internship.find();
    res.status(200).json({ internships });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const postInternship = asyncHandler(async (req, res) => {
  try {
    const {
      internshipTitle,
      internshipType,
      internshipDescription,
      companyName,
      companyURL,
      duration,
      branchesEligible,
    } = req.body;

    const internship = new Internship({
      internshipTitle,
      internshipType,
      internshipDescription,
      companyName,
      companyURL,
      duration,
      branchesEligible,
    });

    const savedInternship = await internship.save();
    res.status(201).json(savedInternship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getInternship = asyncHandler(async (req, res) => {
  try {
    console.log('Received Internship ID:', req.params.id);
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

// ... (your other imports and code)

export const updateInternship = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Received Internship ID for update:', id);

    const updatedInternship = await Internship.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedInternship) {
      console.log('No internship found with ID:', id);
      res.status(404);
      throw new Error('No internship with this Id');
    }

    console.log('Internship updated successfully:', updatedInternship);
    res.status(200).json(updatedInternship);
  } catch (error) {
    console.error('Error updating internship:', error.message);
    res.status(500).json({ error: error.message });
  }
});


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

// backend/models/internshipModel.mjs

import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema(
  {
    internshipTitle: {
      type: String,
      required: true,
    },
    internshipType: {
      type: String,
      required: true,
    },
    internshipDescription: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyURL: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    skillsRequired: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Internship = mongoose.model('Internship', internshipSchema);

export default Internship;

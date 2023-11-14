import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    jobDescription: {
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
    workType: {
      type: String,
      required: true,
    },
    payScale: {
      type: String,
      required: true,
    },
    skills: [
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

const Job = mongoose.model('jobs', jobSchema);
export default Job;

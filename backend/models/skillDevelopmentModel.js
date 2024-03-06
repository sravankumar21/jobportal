import mongoose from 'mongoose';

const skillDevelopmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    courseinstructor: {
      type: String,
      required: true,
    },
    courselink: 
      {
        type: String,
        required: true,
      },
    coursetype: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SkillDevelopment = mongoose.model('SkillDevelopment', skillDevelopmentSchema);

export default SkillDevelopment;

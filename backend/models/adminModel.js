// roleModel.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const RoleSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'student'],
  },
});

RoleSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, 10, (err, hashedPassword) => {
    if (err) return next(err);
    this.password = hashedPassword;
    return next();
  });
});

RoleSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    if (!isMatch) return cb(null, false);
    return cb(null, this);
  });
};

export default mongoose.model('Role', RoleSchema);

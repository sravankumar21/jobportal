// userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Include other user data fields here
});

const User = mongoose.model('User', userSchema);

export default User;

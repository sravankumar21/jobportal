// userController.js
import User from '../models/userModel.js';

// Add a student user
export const addStudentUser = async (req, res) => {
  try {
    const { username, password, /* other fields */ } = req.body;

    // You might want to hash the password here before saving it.

    const newUser = new User({
      username,
      password,
      // Assign other fields here
    });

    const user = await newUser.save();
    res.status(201).json(user); // Send the saved user data as a response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any errors and return an error response
  }
};

// Update a student user
export const updateStudentUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    // You can update specific fields as needed
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!updatedUser) {
      res.status(404).json({ message: 'Student user not found' });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a student user
export const deleteStudentUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      res.status(404).json({ message: 'Student user not found' });
    } else {
      res.status(204).json(); // Successfully deleted
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

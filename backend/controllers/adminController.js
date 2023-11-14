// Import necessary dependencies
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/adminModel.js'; // Make sure the path to your model is correct
import dotenv from 'dotenv';

dotenv.config();

// Admin login
export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the admin exists
    const admin = await Admin.findOne({ username });

    if (!admin) {
      // To avoid revealing too much information, use a generic message
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Check if the entered password matches the stored hashed password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      // To avoid revealing too much information, use a generic message
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Create and return a JWT token upon successful login
    const payload = {
      user: {
        id: admin.id,
      },
    };

    // Sign the JWT with a secure secret
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server Error');
      }
      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Add an admin user
export const addAdminUser = async (req, res) => {
  try {
    const { username, password /* other fields */ } = req.body;

    // You might want to hash the password here before saving it.
    const newAdmin = new Admin({
      username,
      password,
      // Assign other fields here
    });

    const admin = await newAdmin.save();
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an admin user
export const updateAdminUser = async (req, res) => {
  try {
    const adminId = req.params.id;
    const updatedData = req.body;

    // You can update specific fields as needed
    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updatedData, { new: true });

    if (!updatedAdmin) {
      res.status(404).json({ message: 'Admin user not found' });
    } else {
      res.status(200).json(updatedAdmin);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an admin user
export const deleteAdminUser = async (req, res) => {
  try {
    const adminId = req.params.id;
    const deletedAdmin = await Admin.findByIdAndRemove(adminId);

    if (!deletedAdmin) {
      res.status(404).json({ message: 'Admin user not found' });
    } else {
      res.status(204).json(); // Successfully deleted
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

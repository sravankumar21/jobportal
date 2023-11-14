import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.mjs'; 
import userRouter from './routers/userRoutes.mjs';
import adminRouter from './routers/adminRoutes.mjs';
import internshipRouter from './routers/internshipRoutes.mjs'; 
import jobRouter from './routers/jobRoutes.mjs'; 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000', // Update this to the correct origin of your frontend
    credentials: true,
  })
);


// Set up routes
app.use('/admin', adminRouter);
app.use('/users', userRouter);
app.use('/jobs', jobRouter);
app.use('/internships', internshipRouter);

connectDB();

// Server running
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

// This script seeds the database with an admin user if it doesn't already exist.

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import adminModel from './models/adminModel.js';

dotenv.config();
import { connectDB } from './config/db.js'; 
connectDB();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    const existingAdmin = await adminModel.findOne({ email: process.env.ADMIN_EMAIL });

    if (existingAdmin) {
      console.log("Admin already exists");
    } else {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const newAdmin = new adminModel({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
      });

      await newAdmin.save();
      console.log("Admin created successfully");
    }

    mongoose.disconnect();
  } catch (err) {
    console.error("Failed to seed admin:", err);
    process.exit(1);
  }
};

seedAdmin();

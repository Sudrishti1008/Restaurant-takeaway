import express from 'express';
import multer from 'multer';
import {
  addFood,
  listFood,
  removeFood,
  updateFood
} from '../controllers/foodController.js';

import { storage } from '../cloudinary.js'; // Import Cloudinary storage

const foodRouter = express.Router();

const upload = multer({ storage }); // Use cloud storage now

// Routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.patch("/update/:id", upload.single("image"), updateFood);

export default foodRouter;

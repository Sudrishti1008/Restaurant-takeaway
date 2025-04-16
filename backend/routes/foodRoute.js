import express from 'express';
import multer from 'multer';
import {
  addFood,
  listFood,
  removeFood,
  updateFood
} from '../controllers/foodController.js';

const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);


foodRouter.patch("/update/:id", upload.single("image"), updateFood);

export default foodRouter;

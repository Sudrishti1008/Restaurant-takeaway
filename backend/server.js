import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js"; 
import deliverySlotRouter from "./routes/deliverySlotRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static("uploads"));

app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter); 
app.use('/api/slots', deliverySlotRouter);


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 4000, () => console.log("Server running..."));
  })
  .catch((err) => console.error("MongoDB connection failed:", err));

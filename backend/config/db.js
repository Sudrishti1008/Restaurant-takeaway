import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); 

export const connectDB = async () => {
  const mongoURL = process.env.MONGODB_URL;
  if (!mongoURL) {
    console.error("❌ MONGODB_URL not defined");
    process.exit(1);
  }

  await mongoose.connect(mongoURL)
    .then(() => console.log("✅ DB Connected"))
    .catch((err) => {
      console.error("❌ DB Connection Failed", err);
      process.exit(1);
    });
};

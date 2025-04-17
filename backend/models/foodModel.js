import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  price: Number,
  image: String, // will now store the Cloudinary URL
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
});

export default mongoose.model('Food', foodSchema);

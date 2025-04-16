import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  price: Number,
  image: String,
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
});

export default mongoose.model('Food', foodSchema);

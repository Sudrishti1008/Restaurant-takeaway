import mongoose from 'mongoose';

const deliverySlotSchema = new mongoose.Schema({
  day: { type: String, required: true }, // e.g. 'Monday'
  timeRange: { type: String, required: true }, // e.g. '10:00 AM - 12:00 PM'
  isAvailable: { type: Boolean, default: true }
});

export default mongoose.model('DeliverySlot', deliverySlotSchema);

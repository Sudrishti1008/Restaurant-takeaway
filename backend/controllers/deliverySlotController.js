import DeliverySlot from '../models/deliverySlotModel.js';

export const addSlot = async (req, res) => {
  try {
    const newSlot = new DeliverySlot(req.body);
    await newSlot.save();
    res.status(201).json(newSlot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listSlots = async (req, res) => {
  try {
    const slots = await DeliverySlot.find();
    res.status(200).json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeSlot = async (req, res) => {
  try {
    await DeliverySlot.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Slot removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSlot = async (req, res) => {
  try {
    const updated = await DeliverySlot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const toggleSlotAvailability = async (req, res) => {
  try {
    const slot = await DeliverySlot.findById(req.params.id);
    slot.isAvailable = !slot.isAvailable;
    await slot.save();
    res.status(200).json(slot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

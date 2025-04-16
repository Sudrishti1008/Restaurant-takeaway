import express from 'express';
import {
  addSlot,
  listSlots,
  removeSlot,
  updateSlot,
  toggleSlotAvailability
} from '../controllers/deliverySlotController.js';
import verifyAdmin from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/add', verifyAdmin, addSlot);
router.get('/list', listSlots);
router.delete('/:id', verifyAdmin, removeSlot);
router.put('/:id', verifyAdmin, updateSlot);
router.patch('/toggle/:id', toggleSlotAvailability);

export default router;

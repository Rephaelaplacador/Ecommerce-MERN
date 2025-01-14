import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController.js';
import { protectRoute, adminRoute } from '../middleware/auth.middleware.js';


router.route('/').post(protectRoute, addOrderItems).get(protectRoute, adminRoute, getOrders);
router.route('/mine').get(protectRoute, getMyOrders);
router.route('/:id').get(protectRoute, adminRoute, getOrderById);
router.route('/:id/pay').put(protectRoute, adminRoute, updateOrderToPaid);
router.route('/:id/deliver').put(protectRoute, adminRoute, updateOrderToDelivered);

export default router;

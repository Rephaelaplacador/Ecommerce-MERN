import Order from "../models/order.model.js";  
import { protectRoute } from "../middleware/auth.middleware.js";  


export const addOrderItems = async (req, res) => {
  const { orderItems, totalAmount, stripeSessionId } = req.body;
  const user = req.user;  

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  } else {
    const order = new Order({
      user: user._id,
      products: orderItems,
      totalAmount,
      stripeSessionId,
      status: "pending",
    });

    try {
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};


export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;  
    const orders = await Order.find({ user: userId });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};


export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
};


export const updateOrderToPaid = async (req, res) => {
  const { id } = req.params;
  const { stripeSessionId } = req.body;
  
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "success";  
    order.stripeSessionId = stripeSessionId;  
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
};


export const updateOrderToDelivered = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "delivered";  
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
};


export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");  
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// Create Order (checkout)
export const createOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );

  const order = new Order({
    user: req.user.id,
    orderItems: cart.items,
    totalPrice,
  });

  const createdOrder = await order.save();

  // clear cart after order
  cart.items = [];
  await cart.save();

  res.status(201).json(createdOrder);
};

// Get user orders
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate("orderItems.product");
  res.json(orders);
};
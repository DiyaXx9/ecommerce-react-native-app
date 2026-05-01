import Cart from "../models/Cart.js";

// ✅ ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    const quantity = Number(qty) || 1;

if (existItem) {
  existItem.quantity = (existItem.quantity || 0) + quantity;
} else {
  cart.items.push({
    product: productId,
    quantity: quantity,
  });
}

    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId })
      .populate("items.product");

    res.json(updatedCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET CART
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product");

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE CART ITEM
export const updateCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.qty = Number(qty);

    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId })
      .populate("items.product");

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ REMOVE ITEM
export const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId })
      .populate("items.product");

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
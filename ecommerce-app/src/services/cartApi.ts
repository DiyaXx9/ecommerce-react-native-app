import axios from "../api/axios"; // ✅ IMPORTANT

// GET CART
export const fetchCart = async () => {
  const res = await axios.get("/cart");
  return res.data;
};

// UPDATE QUANTITY
export const updateCartItem = async (productId: string, quantity: number) => {
  const res = await axios.put("/cart", {
    productId,
    qty: quantity, // ✅ match backend
  });
  return res.data;
};

// REMOVE ITEM
export const removeCartItem = async (productId: string) => {
  const res = await axios.delete(`/cart/${productId}`);
  return res.data;
};
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// TYPES
export interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
}

interface CartState {
  cartItems: CartItem[];
  orders: Order[];
}

const initialState: CartState = {
  cartItems: [],
  orders: [],
};

type UpdatePayload = {
  id: string;
  type: "increase" | "decrease";
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ SET CART (handles qty/quantity mismatch)
    setCart: (state, action: PayloadAction<{ items: any[] }>) => {
      state.cartItems = (action.payload?.items || []).map((item: any) => ({
        _id: item._id,
        product: item.product,
        quantity: item.quantity ?? item.qty ?? 1,
      }));
    },

    // ✅ LOCAL UPDATE (fallback if API fails)
    updateQuantity: (state, action: PayloadAction<UpdatePayload>) => {
      const { id, type } = action.payload;

      state.cartItems = state.cartItems.map((item) => {
        if (item.product._id === id) {
          if (type === "increase") {
            return { ...item, quantity: item.quantity + 1 };
          }
          if (type === "decrease" && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      });
    },

    // ✅ REMOVE ITEM
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product._id !== action.payload
      );
    },

    // ✅ PLACE ORDER
    placeOrder: (state) => {
      if (state.cartItems.length === 0) return;

      const totalPrice = state.cartItems.reduce(
        (acc, item) =>
          acc + (item.product.price || 0) * item.quantity,
        0
      );

      const newOrder: Order = {
        id: Date.now().toString(),
        items: [...state.cartItems],
        totalPrice,
        createdAt: new Date().toISOString(),
      };

      state.orders.unshift(newOrder);
      state.cartItems = [];
    },
  },
});

export const {
  setCart,
  updateQuantity,
  removeFromCart,
  placeOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
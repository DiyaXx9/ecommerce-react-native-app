import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import authReducer from "./authSlice";
import wishlistReducer from "./wishlistSlice";
import addressReducer from "./addressSlice"; // ✅ NEW

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    address: addressReducer, // ✅ NEW
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
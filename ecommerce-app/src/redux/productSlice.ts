import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ TYPES
export interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  rating?: number;
  description?: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// ✅ INITIAL STATE
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// ✅ SLICE
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchSuccess: (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.products = action.payload;
    },

    fetchFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ OPTIONAL (for future use)
    clearProducts: (state) => {
      state.products = [];
    },
  },
});

// ✅ EXPORTS
export const {
  fetchStart,
  fetchSuccess,
  fetchFail,
  clearProducts,
} = productSlice.actions;

export default productSlice.reducer;
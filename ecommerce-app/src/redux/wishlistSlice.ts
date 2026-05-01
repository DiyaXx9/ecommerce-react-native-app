import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState =
{
  items: [],
};

const wishlistSlice =
  createSlice({
    name: "wishlist",
    initialState,

    reducers: {
      // ❤️ ADD / REMOVE SINGLE
      toggleWishlist: (
        state,
        action: PayloadAction<any>
      ) => {
        const item =
          action.payload;

        const exists =
          state.items.find(
            (i) =>
              i._id ===
              item._id
          );

        if (exists) {
          state.items =
            state.items.filter(
              (i) =>
                i._id !==
                item._id
            );
        } else {
          state.items.push({
            _id:
              item._id,
            name:
              item.name ||
              "",
            price:
              item.price ||
              0,
            images:
              item.images ||
              [],
          });
        }
      },

      // 🔥 LOAD FROM STORAGE
      setWishlist: (
        state,
        action: PayloadAction<
          WishlistItem[]
        >
      ) => {
        state.items =
          action.payload;
      },

      // 🗑 REMOVE ALL
      clearWishlist: (
        state
      ) => {
        state.items = [];
      },

      // ❌ REMOVE SINGLE
      removeWishlistItem: (
        state,
        action: PayloadAction<string>
      ) => {
        state.items =
          state.items.filter(
            (item) =>
              item._id !==
              action.payload
          );
      },
    },
  });

export const {
  toggleWishlist,
  setWishlist,
  clearWishlist,
  removeWishlistItem,
} =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
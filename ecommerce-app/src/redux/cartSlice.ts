import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

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

export type OrderStatus =
  | "Placed"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  status: OrderStatus;
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

type StatusPayload = {
  id: string;
  status: OrderStatus;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCart: (
      state,
      action: PayloadAction<{
        items: any[];
      }>
    ) => {
      state.cartItems =
        (
          action.payload
            ?.items || []
        ).map(
          (item: any) => ({
            _id:
              item._id,
            product:
              item.product,
            quantity:
              item.quantity ??
              item.qty ??
              1,
          })
        );
    },

    updateQuantity: (
      state,
      action: PayloadAction<UpdatePayload>
    ) => {
      const {
        id,
        type,
      } =
        action.payload;

      state.cartItems =
        state.cartItems.map(
          (
            item
          ) => {
            if (
              item.product
                ._id ===
              id
            ) {
              if (
                type ===
                "increase"
              ) {
                return {
                  ...item,
                  quantity:
                    item.quantity +
                    1,
                };
              }

              if (
                type ===
                  "decrease" &&
                item.quantity >
                  1
              ) {
                return {
                  ...item,
                  quantity:
                    item.quantity -
                    1,
                };
              }
            }

            return item;
          }
        );
    },

    removeFromCart: (
      state,
      action: PayloadAction<string>
    ) => {
      state.cartItems =
        state.cartItems.filter(
          (
            item
          ) =>
            item.product
              ._id !==
            action.payload
        );
    },

    placeOrder: (
      state
    ) => {
      if (
        state.cartItems
          .length ===
        0
      )
        return;

      const totalPrice =
        state.cartItems.reduce(
          (
            acc,
            item
          ) =>
            acc +
            item.product
              .price *
              item.quantity,
          0
        );

      const newOrder: Order =
        {
          id: Date.now().toString(),
          items: [
            ...state.cartItems,
          ],
          totalPrice,
          createdAt:
            new Date().toISOString(),
          status:
            "Placed",
        };

      state.orders.unshift(
        newOrder
      );
      state.cartItems =
        [];
    },

    updateOrderStatus: (
      state,
      action: PayloadAction<StatusPayload>
    ) => {
      const {
        id,
        status,
      } =
        action.payload;

      const order =
        state.orders.find(
          (
            item
          ) =>
            item.id ===
            id
        );

      if (order) {
        order.status =
          status;
      }
    },

    // ❌ CANCEL ORDER
    cancelOrder: (
      state,
      action: PayloadAction<string>
    ) => {
      const order =
        state.orders.find(
          (
            item
          ) =>
            item.id ===
            action.payload
        );

      if (
        order &&
        order.status ===
          "Placed"
      ) {
        order.status =
          "Cancelled";
      }
    },
  },
});

export const {
  setCart,
  updateQuantity,
  removeFromCart,
  placeOrder,
  updateOrderStatus,
  cancelOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
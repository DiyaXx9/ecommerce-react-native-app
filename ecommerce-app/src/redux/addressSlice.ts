import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  pincode: string;
  addressLine: string;
  city: string;
  state: string;
}

interface AddressState {
  addresses: Address[];
  selectedAddressId: string | null;
}

const initialState: AddressState = {
  addresses: [],
  selectedAddressId: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddresses(state, action: PayloadAction<Address[]>) {
      state.addresses = action.payload;
    },

    addAddress(state, action: PayloadAction<Address>) {
      state.addresses.push(action.payload);
    },

    updateAddress(state, action: PayloadAction<Address>) {
      const index = state.addresses.findIndex(
        (a) => a.id === action.payload.id
      );
      if (index !== -1) state.addresses[index] = action.payload;
    },

    deleteAddress(state, action: PayloadAction<string>) {
      state.addresses = state.addresses.filter(
        (a) => a.id !== action.payload
      );
    },

    selectAddress(state, action: PayloadAction<string>) {
      state.selectedAddressId = action.payload;
    },
  },
});

export const {
  addAddress,
  updateAddress,
  deleteAddress,
  selectAddress,
  setAddresses,
} = addressSlice.actions;

export default addressSlice.reducer;
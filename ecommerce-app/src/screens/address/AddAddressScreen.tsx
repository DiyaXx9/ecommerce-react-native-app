import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, selectAddress } from "../../redux/addressSlice";
import AddressForm from "../../components/address/AddressForm";
import { saveAddresses } from "../../utils/storage";
import { RootState } from "../../redux/store";

const AddAddressScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const addresses = useSelector(
    (state: RootState) => state.address.addresses
  );

  const handleSubmit = async (data: any) => {
    try {
      console.log("🔥 SUBMIT CLICKED:", data);

      // ✅ SAFE UNIQUE ID (no uuid issues on mobile)
      const newAddress = {
        id: Date.now().toString(),
        ...data,
      };

      const updated = [...(addresses || []), newAddress];

      // ✅ Redux update
      dispatch(addAddress(newAddress));

      // ✅ Auto select address
      dispatch(selectAddress(newAddress.id));

      // ✅ Save to storage
      await saveAddresses(updated);

      console.log("✅ ADDRESS SAVED:", newAddress);

      // ✅ Navigate back
      navigation.goBack();

    } catch (error) {
      console.log("❌ SAVE ERROR:", error);
    }
  };

  return (
    <View style={styles.container}>
      <AddressForm
        onSubmit={handleSubmit}
        initialData={{
          fullName: "",
          phone: "",
          pincode: "",
          addressLine: "",
          city: "",
          state: "",
        }}
      />
    </View>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
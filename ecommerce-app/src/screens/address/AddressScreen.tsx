import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setAddresses,
  selectAddress,
  deleteAddress,
} from "../../redux/addressSlice";
import { getAddresses, saveAddresses } from "../../utils/storage";
import { useFocusEffect } from "@react-navigation/native";

const AddressScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const addresses = useSelector(
    (state: RootState) => state.address.addresses
  );

  const selectedAddressId = useSelector(
    (state: RootState) => state.address.selectedAddressId
  );

  useFocusEffect(
    React.useCallback(() => {
      load();
    }, [])
  );

  const load = async () => {
    const data = await getAddresses();
    dispatch(setAddresses(data));
  };

  // ✅ SELECT ADDRESS
  const handleSelect = (id: string) => {
    dispatch(selectAddress(id));
    navigation.goBack(); // go back to checkout
  };

  // ✅ DELETE ADDRESS
  const handleDelete = (id: string) => {
    Alert.alert("Delete Address", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          const updated = addresses.filter((a) => a.id !== id);
          dispatch(deleteAddress(id));
          await saveAddresses(updated);
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {addresses.length === 0 ? (
        <Text style={styles.empty}>No addresses found</Text>
      ) : (
        <FlatList
          data={addresses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isSelected = item.id === selectedAddressId;

            return (
              <TouchableOpacity
                style={[
                  styles.card,
                  isSelected && styles.selectedCard,
                ]}
                onPress={() => handleSelect(item.id)}
              >
                {/* 🔘 RADIO */}
                <View style={styles.row}>
                  <View
                    style={[
                      styles.radio,
                      isSelected && styles.radioActive,
                    ]}
                  />

                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>
                      {item.fullName}
                    </Text>
                    <Text>{item.addressLine}</Text>
                    <Text>
                      {item.city}, {item.state} - {item.pincode}
                    </Text>
                    <Text>{item.phone}</Text>
                  </View>
                </View>

                {/* ❌ DELETE */}
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
        />
      )}

      {/* ➕ ADD */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddAddress")}
      >
        <Text style={styles.addText}>+ Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },

  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#888",
  },

  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: "#000",
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#999",
    marginRight: 10,
    marginTop: 4,
  },

  radioActive: {
    backgroundColor: "#000",
    borderColor: "#000",
  },

  name: {
    fontWeight: "600",
    marginBottom: 4,
  },

  delete: {
    color: "red",
    marginTop: 8,
    fontWeight: "500",
  },

  addButton: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  addText: {
    color: "#fff",
    fontWeight: "600",
  },
});
import React, { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/checkoutStyles";

interface Address {
  id: string;
  fullName: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

interface Props {
  selectedAddress: Address | undefined;
  onChange: () => void;
}

const AddressSection: React.FC<Props> = ({
  selectedAddress,
  onChange,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>

        <TouchableOpacity onPress={onChange}>
          <Text style={styles.changeBtnText}>
            {selectedAddress ? "CHANGE" : "ADD"}
          </Text>
        </TouchableOpacity>
      </View>

      {selectedAddress ? (
        <>
          <Text style={styles.name}>
            {selectedAddress.fullName}
          </Text>

          <Text style={styles.address}>
            {selectedAddress.addressLine}, {selectedAddress.city}
          </Text>

          <Text style={styles.address}>
            {selectedAddress.state} - {selectedAddress.pincode}
          </Text>

          <Text style={styles.phone}>
            {selectedAddress.phone}
          </Text>
        </>
      ) : (
        <Text style={styles.errorText}>
          No address selected
        </Text>
      )}
    </View>
  );
};

export default memo(AddressSection);
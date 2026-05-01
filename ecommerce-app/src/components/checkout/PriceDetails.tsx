import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/checkoutStyles";

interface Props {
  total: number;
}

const PriceDetails: React.FC<Props> = ({ total }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Price Details</Text>

      <View style={styles.rowBetween}>
        <Text>Subtotal</Text>
        <Text>₹{total.toFixed(2)}</Text>
      </View>

      <View style={styles.rowBetween}>
        <Text>Delivery</Text>
        <Text style={styles.free}>FREE</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.rowBetween}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>
          ₹{total.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default PriceDetails;
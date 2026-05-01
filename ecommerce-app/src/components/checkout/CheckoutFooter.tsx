import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/checkoutStyles";

interface Props {
  total: number;
  onPress: () => void;
}

const CheckoutFooter: React.FC<Props> = ({
  total,
  onPress,
}) => {
  return (
    <View style={styles.footer}>
      <View>
        <Text style={styles.footerPrice}>
          ₹{total.toFixed(0)}
        </Text>
        <Text style={styles.footerSub}>Total Amount</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutFooter;
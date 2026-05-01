import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { placeOrder } from "../../redux/cartSlice";

const PaymentScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();

  const total = route?.params?.total || 0;

  const [method, setMethod] = useState("COD");

  const handlePayment = () => {
    Alert.alert(
      "Processing Payment...",
      "Please wait"
    );

    setTimeout(() => {
      dispatch(placeOrder());

      navigation.replace("OrderSuccess");

    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Select Payment Method
      </Text>

      {[
        "COD",
        "UPI",
        "Card",
        "Net Banking",
      ].map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.option,
            method === item &&
              styles.active,
          ]}
          onPress={() =>
            setMethod(item)
          }
        >
          <Text style={styles.text}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={handlePayment}
      >
        <Text style={styles.btnText}>
          Pay ₹{total}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  option: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 12,
  },

  active: {
    borderColor: "#000",
    backgroundColor: "#f3f3f3",
  },

  text: {
    fontSize: 16,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
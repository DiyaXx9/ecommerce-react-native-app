import { View, Text, StyleSheet } from "react-native";

const EmptyCart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Cart is Empty 🛒</Text>
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "gray",
  },
});
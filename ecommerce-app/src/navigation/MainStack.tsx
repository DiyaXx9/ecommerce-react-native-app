import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OrderDetailsScreen from "../screens/order/OrderDetailsScreen";
import PaymentScreen from "../screens/payment/PaymentScreen";

import BottomTabs from "./BottomTabs";
import OrderSuccessScreen from "../screens/order/OrderSuccessScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import ProductDetailScreen from "../screens/product/ProductDetailScreen";
import LoginScreen from "../screens/auth/LoginScreen";

// ✅ Address Screens
import AddressScreen from "../screens/address/AddressScreen";
import AddAddressScreen from "../screens/address/AddAddressScreen";

// Redux
import { setWishlist } from "../redux/wishlistSlice";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const dispatch = useDispatch();

  // 🔥 LOAD WISHLIST ON APP START
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const data = await AsyncStorage.getItem("wishlist");
        if (data) {
          dispatch(setWishlist(JSON.parse(data)));
        }
      } catch (err) {
        console.log("Load wishlist error:", err);
      }
    };

    loadWishlist();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Login"

      // ✅ GLOBAL HEADER (Home Icon Everywhere)
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Tabs", { screen: "Home" })
            }
            style={{ marginRight: 15 }}
          >
            <Ionicons name="home" size={24} color="black" />
          </TouchableOpacity>
        ),
      })}
    >
      {/* 🔐 AUTH */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      {/* 🏠 MAIN APP (Tabs) */}
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{ headerShown: false }} // tabs handle their own header
      />

      <Stack.Screen
  name="OrderDetails"
  component={OrderDetailsScreen}
  options={{ title: "Order Details" }}
/>

      {/* 📦 PRODUCT */}
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailScreen}
        options={{ title: "Product Details" }}
      />

      {/* 📍 ADDRESS FLOW */}
      <Stack.Screen
        name="Address"
        component={AddressScreen}
        options={{ title: "My Addresses" }}
      />

      <Stack.Screen
        name="AddAddress"
        component={AddAddressScreen}
        options={{ title: "Add New Address" }}
      />

      {/* 💳 CHECKOUT */}
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: "Checkout" }}
      />

      <Stack.Screen
  name="Payment"
  component={PaymentScreen}
  options={{ title: "Payment" }}
/>

      {/* ✅ ORDER SUCCESS */}
      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccessScreen}
        options={{ title: "Order Success" }}
      />
    </Stack.Navigator>
  );
}
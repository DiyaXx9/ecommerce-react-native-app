import React, { useMemo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import HomeScreen from "../screens/home/HomeScreen";
import CartScreen from "../screens/cart/CartScreen";
import OrderScreen from "../screens/OrderScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import WishlistScreen from "../screens/profile/WishlistScreen";
import AIStylistScreen from "../screens/assistant/AIStylistScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const cartItems = useSelector(
    (state: RootState) => state.cart.cartItems
  );

  const totalItems = useMemo(() => {
    return cartItems.reduce(
      (sum: number, item: any) =>
        sum + (item.quantity || 1),
      0
    );
  }, [cartItems]);

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: true,
        headerTitleAlign: "center",

        headerStyle: {
          height: 60,
        },

        headerRight: () => (
          <Ionicons
            name="home"
            size={24}
            color="black"
            style={{ marginRight: 15 }}
            onPress={() =>
              navigation.navigate("Home")
            }
          />
        ),

        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;

            case "Wishlist":
              iconName = "heart-outline";
              break;

            case "Assistant":
              iconName = "sparkles-outline";
              break;

            case "Cart":
              iconName = "cart-outline";
              break;

            case "Orders":
              iconName = "list-outline";
              break;

            case "Profile":
              iconName = "person-outline";
              break;
          }

          if (route.name === "Cart") {
            return (
              <View style={styles.iconContainer}>
                <Ionicons
                  name={iconName}
                  size={size}
                  color={color}
                />

                {totalItems > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {totalItems > 9
                        ? "9+"
                        : totalItems}
                    </Text>
                  </View>
                )}
              </View>
            );
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },

        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          headerTitle: "My Wishlist",
        }}
      />

      <Tab.Screen
        name="Assistant"
        component={AIStylistScreen}
        options={{
          headerTitle: "AI Stylist",
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
      />

      <Tab.Screen
        name="Orders"
        component={OrderScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    position: "absolute",
    top: -6,
    right: -10,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
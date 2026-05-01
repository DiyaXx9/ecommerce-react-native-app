import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

import { logout } from "../../redux/authSlice";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const user = useSelector(
    (state: any) => state?.auth?.user
  );

  const cartCount = useSelector(
    (state: any) =>
      state.cart.cartItems.length
  );

  const orderCount = useSelector(
    (state: any) =>
      state.cart.orders.length
  );

  const wishlistCount = useSelector(
    (state: any) =>
      state.wishlist.items.length
  );

  const handleLogout = async () => {
    try {
      if (Platform.OS === "web") {
        localStorage.removeItem("token");
      } else {
        await SecureStore.deleteItemAsync(
          "token"
        );
      }

      dispatch(logout());

      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Login",
          },
        ],
      });
    } catch (error) {
      Alert.alert(
        "Logout Error"
      );
    }
  };

  const MenuItem = ({
    icon,
    title,
    sub,
    onPress,
  }: any) => (
    <TouchableOpacity
      style={
        styles.item
      }
      onPress={
        onPress
      }
    >
      <View
        style={
          styles.leftRow
        }
      >
        <View
          style={
            styles.iconBox
          }
        >
          <Ionicons
            name={icon}
            size={20}
            color="#111"
          />
        </View>

        <View>
          <Text
            style={
              styles.itemTitle
            }
          >
            {title}
          </Text>

          {sub ? (
            <Text
              style={
                styles.itemSub
              }
            >
              {sub}
            </Text>
          ) : null}
        </View>
      </View>

      <Ionicons
        name="chevron-forward"
        size={18}
        color="#999"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={
        styles.container
      }
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* TOP CARD */}
        <View
          style={
            styles.headerCard
          }
        >
          <View
            style={
              styles.avatar
            }
          >
            <Text
              style={
                styles.avatarText
              }
            >
              {user?.name?.[0] ||
                "U"}
            </Text>
          </View>

          <Text
            style={
              styles.name
            }
          >
            {user?.name ||
              "Guest User"}
          </Text>

          <Text
            style={
              styles.email
            }
          >
            {user?.email ||
              "No Email"}
          </Text>
        </View>

        {/* STATS */}
        <View
          style={
            styles.statsRow
          }
        >
          <View
            style={
              styles.statCard
            }
          >
            <Text
              style={
                styles.statNum
              }
            >
              {
                orderCount
              }
            </Text>
            <Text
              style={
                styles.statLabel
              }
            >
              Orders
            </Text>
          </View>

          <View
            style={
              styles.statCard
            }
          >
            <Text
              style={
                styles.statNum
              }
            >
              {
                wishlistCount
              }
            </Text>
            <Text
              style={
                styles.statLabel
              }
            >
              Wishlist
            </Text>
          </View>

          <View
            style={
              styles.statCard
            }
          >
            <Text
              style={
                styles.statNum
              }
            >
              {
                cartCount
              }
            </Text>
            <Text
              style={
                styles.statLabel
              }
            >
              Cart
            </Text>
          </View>
        </View>

        {/* MENU */}
        <View
          style={
            styles.card
          }
        >
          <MenuItem
            icon="bag-outline"
            title="My Orders"
            sub="Track your purchases"
            onPress={() =>
              navigation.navigate(
                "Tabs",
                {
                  screen:
                    "Orders",
                }
              )
            }
          />

          <MenuItem
            icon="heart-outline"
            title="Wishlist"
            sub="Saved products"
            onPress={() =>
              navigation.navigate(
                "Tabs",
                {
                  screen:
                    "Wishlist",
                }
              )
            }
          />

          <MenuItem
            icon="location-outline"
            title="Manage Addresses"
            sub="Add / edit delivery address"
            onPress={() =>
              navigation.navigate(
                "Address"
              )
            }
          />

          <MenuItem
            icon="sparkles-outline"
            title="AI Stylist"
            sub="Smart shopping assistant"
            onPress={() =>
              navigation.navigate(
                "Tabs",
                {
                  screen:
                    "Assistant",
                }
              )
            }
          />

          <MenuItem
            icon="settings-outline"
            title="Settings"
            sub="Coming soon"
            onPress={() =>
              Alert.alert(
                "Settings",
                "Coming soon"
              )
            }
          />
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          style={
            styles.logout
          }
          onPress={
            handleLogout
          }
        >
          <Ionicons
            name="log-out-outline"
            size={18}
            color="#fff"
          />

          <Text
            style={
              styles.logoutText
            }
          >
            Logout
          </Text>
        </TouchableOpacity>

        <Text
          style={
            styles.footer
          }
        >
          Ecommerce App •
          v1.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#f5f5f5",
      padding: 14,
    },

    headerCard: {
      backgroundColor:
        "#111",
      borderRadius: 20,
      padding: 22,
      alignItems:
        "center",
      marginBottom: 14,
    },

    avatar: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor:
        "#00A8E1",
      justifyContent:
        "center",
      alignItems:
        "center",
      marginBottom: 12,
    },

    avatarText: {
      color: "#fff",
      fontSize: 28,
      fontWeight:
        "700",
    },

    name: {
      color: "#fff",
      fontSize: 20,
      fontWeight:
        "700",
    },

    email: {
      color: "#bbb",
      marginTop: 4,
    },

    statsRow: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      marginBottom: 14,
    },

    statCard: {
      flex: 1,
      backgroundColor:
        "#fff",
      padding: 14,
      borderRadius: 16,
      alignItems:
        "center",
      marginHorizontal: 4,
    },

    statNum: {
      fontSize: 18,
      fontWeight:
        "700",
    },

    statLabel: {
      color: "#777",
      marginTop: 4,
      fontSize: 12,
    },

    card: {
      backgroundColor:
        "#fff",
      borderRadius: 18,
      paddingHorizontal: 14,
      marginBottom: 18,
    },

    item: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderColor:
        "#f1f1f1",
    },

    leftRow: {
      flexDirection:
        "row",
      alignItems:
        "center",
    },

    iconBox: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor:
        "#f3f3f3",
      justifyContent:
        "center",
      alignItems:
        "center",
      marginRight: 12,
    },

    itemTitle: {
      fontSize: 15,
      fontWeight:
        "600",
      color: "#111",
    },

    itemSub: {
      fontSize: 12,
      color: "#777",
      marginTop: 2,
    },

    logout: {
      backgroundColor:
        "#ff3b30",
      padding: 15,
      borderRadius: 14,
      alignItems:
        "center",
      justifyContent:
        "center",
      flexDirection:
        "row",
    },

    logoutText: {
      color: "#fff",
      fontWeight:
        "700",
      fontSize: 15,
      marginLeft: 8,
    },

    footer: {
      textAlign:
        "center",
      color: "#888",
      marginTop: 16,
      marginBottom: 20,
      fontSize: 12,
    },
  });
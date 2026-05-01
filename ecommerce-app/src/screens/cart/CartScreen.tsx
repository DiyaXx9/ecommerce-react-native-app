import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import CartItem from "../../components/CartItem";
import EmptyCart from "../../components/EmptyCart";

const CartScreen = () => {
  const navigation = useNavigation<any>();

  const { cartItems } = useSelector(
    (state: any) => state.cart
  );

  const [coupon, setCoupon] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  const total = useMemo(() => {
    return cartItems.reduce(
      (
        acc: number,
        item: any
      ) => {
        const price =
          Number(
            item.product
              ?.price || 0
          );

        const qty =
          Number(
            item.quantity || 0
          );

        return (
          acc +
          price * qty
        );
      },
      0
    );
  }, [cartItems]);

  const applyCoupon =
    () => {
      const code =
        coupon
          .trim()
          .toUpperCase();

      if (
        code ===
        "SAVE10"
      ) {
        setDiscount(
          total * 0.1
        );
        Alert.alert(
          "Success",
          "10% Discount Applied 🎉"
        );
      } else if (
        code ===
        "WELCOME50"
      ) {
        setDiscount(50);
        Alert.alert(
          "Success",
          "₹50 Discount Applied 🎉"
        );
      } else if (
        code ===
        "FESTIVE20"
      ) {
        setDiscount(
          total * 0.2
        );
        Alert.alert(
          "Success",
          "20% Discount Applied 🎉"
        );
      } else {
        setDiscount(0);
        Alert.alert(
          "Invalid Coupon"
        );
      }
    };

  const finalTotal =
    total - discount;

  if (
    !cartItems ||
    cartItems.length === 0
  ) {
    return <EmptyCart />;
  }

  return (
    <SafeAreaView
      style={
        styles.container
      }
    >
      <StatusBar
        barStyle="dark-content"
      />

      <FlatList
        data={cartItems}
        keyExtractor={(
          item: any
        ) => item._id}
        renderItem={({
          item,
        }) => (
          <CartItem
            item={item}
          />
        )}
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.list
        }
      />

      {/* 🎟️ COUPON */}
      <View
        style={
          styles.couponBox
        }
      >
        <TextInput
          placeholder="Enter Coupon Code"
          value={coupon}
          onChangeText={
            setCoupon
          }
          style={
            styles.input
          }
        />

        <TouchableOpacity
          style={
            styles.applyBtn
          }
          onPress={
            applyCoupon
          }
        >
          <Text
            style={
              styles.applyText
            }
          >
            Apply
          </Text>
        </TouchableOpacity>
      </View>

      {/* 💰 PRICE */}
      <View
        style={
          styles.priceBox
        }
      >
        <Text
          style={
            styles.priceTitle
          }
        >
          Price Details
        </Text>

        <View
          style={
            styles.row
          }
        >
          <Text>
            Subtotal
          </Text>
          <Text>
            ₹
            {total.toFixed(
              2
            )}
          </Text>
        </View>

        <View
          style={
            styles.row
          }
        >
          <Text>
            Discount
          </Text>
          <Text
            style={{
              color:
                "green",
            }}
          >
            -₹
            {discount.toFixed(
              2
            )}
          </Text>
        </View>

        <View
          style={
            styles.row
          }
        >
          <Text>
            Delivery
          </Text>
          <Text
            style={
              styles.free
            }
          >
            FREE
          </Text>
        </View>

        <View
          style={
            styles.divider
          }
        />

        <View
          style={
            styles.row
          }
        >
          <Text
            style={
              styles.totalLabel
            }
          >
            Total
          </Text>

          <Text
            style={
              styles.totalAmount
            }
          >
            ₹
            {finalTotal.toFixed(
              2
            )}
          </Text>
        </View>
      </View>

      {/* 🚀 CHECKOUT */}
      <View
        style={
          styles.footer
        }
      >
        <TouchableOpacity
          style={
            styles.button
          }
          onPress={() =>
            navigation.navigate(
              "Checkout",
              {
                total:
                  finalTotal,
              }
            )
          }
        >
          <Text
            style={
              styles.buttonText
            }
          >
            Proceed to Checkout ₹
            {finalTotal.toFixed(
              0
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#f5f5f5",
    },

    list: {
      padding: 10,
      paddingBottom: 420
    },

    couponBox: {
      backgroundColor:
        "#fff",
      padding: 12,
      flexDirection:
        "row",
      alignItems:
        "center",
      borderTopWidth: 1,
      borderColor:
        "#eee",
    },

    input: {
      flex: 1,
      borderWidth: 1,
      borderColor:
        "#ddd",
      borderRadius: 8,
      paddingHorizontal: 12,
      height: 45,
      marginRight: 10,
      backgroundColor:
        "#fff",
    },

    applyBtn: {
      backgroundColor:
        "#000",
      paddingHorizontal: 16,
      height: 45,
      borderRadius: 8,
      justifyContent:
        "center",
    },

    applyText: {
      color: "#fff",
      fontWeight: "700",
    },

    priceBox: {
      backgroundColor:
        "#fff",
      padding: 15,
      borderTopWidth: 1,
      borderColor:
        "#eee",
    },

    priceTitle: {
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 10,
    },

    row: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      marginVertical: 5,
    },

    free: {
      color: "green",
      fontWeight: "700",
    },

    divider: {
      height: 1,
      backgroundColor:
        "#eee",
      marginVertical: 10,
    },

    totalLabel: {
      fontSize: 16,
      fontWeight: "700",
    },

    totalAmount: {
      fontSize: 16,
      fontWeight: "700",
    },

    footer: {
      position:
        "absolute",
      bottom: 0,
      width: "100%",
      padding: 10,
      backgroundColor:
        "#fff",
      borderTopWidth: 1,
      borderColor:
        "#ddd",
    },

    button: {
      backgroundColor:
        "#fb641b",
      padding: 15,
      borderRadius: 8,
      alignItems:
        "center",
    },

    buttonText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 16,
    },
  });
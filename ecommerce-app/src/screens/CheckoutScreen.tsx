import React, {
  useMemo,
  useState,
} from "react";
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import CheckoutItem from "../components/product/CheckoutItem";
import AddressSection from "../components/checkout/AddressSection";
import PriceDetails from "../components/checkout/PriceDetails";
import CheckoutFooter from "../components/checkout/CheckoutFooter";

import styles from "../styles/checkoutStyles";
import { placeOrder } from "../redux/cartSlice";

const CheckoutScreen = ({
  navigation,
}: any) => {
  const dispatch =
    useDispatch();

  const cartItems =
    useSelector(
      (state: any) =>
        state.cart
          ?.cartItems ||
        []
    );

  const addresses =
    useSelector(
      (state: any) =>
        state.address
          ?.addresses ||
        []
    );

  const selectedAddressId =
    useSelector(
      (state: any) =>
        state.address
          ?.selectedAddressId
    );

  const selectedAddress =
    addresses.find(
      (a: any) =>
        a.id ===
        selectedAddressId
    );

  const [
    coupon,
    setCoupon,
  ] = useState("");

  const [
    appliedCode,
    setAppliedCode,
  ] = useState("");

  const [
    discount,
    setDiscount,
  ] = useState(0);

  const originalTotal =
    useMemo(() => {
      return cartItems.reduce(
        (
          acc: number,
          item: any
        ) =>
          acc +
          (item.product
            ?.price ||
            0) *
            item.quantity,
        0
      );
    }, [cartItems]);

  const total =
    Math.max(
      originalTotal -
        discount,
      0
    );

  const applyCoupon =
    () => {
      const code =
        coupon
          .trim()
          .toUpperCase();

      if (
        !code
      ) {
        Alert.alert(
          "Enter coupon code"
        );
        return;
      }

      if (
        code ===
        "SAVE10"
      ) {
        const amount =
          Math.floor(
            originalTotal *
              0.1
          );

        setDiscount(
          amount
        );
        setAppliedCode(
          code
        );
      } else if (
        code ===
        "FIRST50"
      ) {
        setDiscount(
          50
        );
        setAppliedCode(
          code
        );
      } else if (
        code ===
        "FREESHIP"
      ) {
        setDiscount(
          40
        );
        setAppliedCode(
          code
        );
      } else {
        Alert.alert(
          "Invalid Coupon"
        );
        return;
      }

      Alert.alert(
        "Coupon Applied 🎉"
      );
    };

  const handlePlaceOrder =
    () => {
      if (
        !selectedAddress
      ) {
        Alert.alert(
          "Select Address"
        );
        return;
      }

      if (
        cartItems.length ===
        0
      ) {
        Alert.alert(
          "Cart is empty"
        );
        return;
      }

      navigation.navigate(
        "Payment",
        {
          total:
            total,
        }
      );
    };

  return (
    <SafeAreaView
      style={
        styles.container
      }
    >
      <StatusBar barStyle="dark-content" />

      <FlatList
        data={
          cartItems
        }
        keyExtractor={(
          item,
          index
        ) =>
          item.product
            ?._id ||
          index.toString()
        }
        ListHeaderComponent={
          <>
            <AddressSection
              selectedAddress={
                selectedAddress
              }
              onChange={() =>
                navigation.navigate(
                  "Address"
                )
              }
            />

            {/* COUPON */}
            <View
              style={{
                backgroundColor:
                  "#fff",
                marginTop: 12,
                marginHorizontal: 14,
                padding: 14,
                borderRadius: 14,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight:
                    "700",
                  marginBottom: 10,
                }}
              >
                Apply Coupon 🎟️
              </Text>

              <View
                style={{
                  flexDirection:
                    "row",
                }}
              >
                <TextInput
                  placeholder="Enter code"
                  value={
                    coupon
                  }
                  onChangeText={
                    setCoupon
                  }
                  style={{
                    flex: 1,
                    backgroundColor:
                      "#f5f5f5",
                    borderRadius: 10,
                    paddingHorizontal: 12,
                  }}
                />

                <TouchableOpacity
                  onPress={
                    applyCoupon
                  }
                  style={{
                    backgroundColor:
                      "#111",
                    paddingHorizontal: 16,
                    justifyContent:
                      "center",
                    borderRadius: 10,
                    marginLeft: 8,
                  }}
                >
                  <Text
                    style={{
                      color:
                        "#fff",
                      fontWeight:
                        "700",
                    }}
                  >
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  marginTop: 10,
                  color:
                    "#666",
                  fontSize: 12,
                }}
              >
                Try:
                SAVE10,
                FIRST50,
                FREESHIP
              </Text>

              {appliedCode ? (
                <Text
                  style={{
                    marginTop: 8,
                    color:
                      "green",
                    fontWeight:
                      "700",
                  }}
                >
                  {appliedCode} Applied •
                  ₹{discount} Saved
                </Text>
              ) : null}
            </View>
          </>
        }
        renderItem={({
          item,
        }) => (
          <CheckoutItem
            item={
              item
            }
          />
        )}
        ListFooterComponent={
          <PriceDetails
            total={
              total
            }
          />
        }
        contentContainerStyle={
          styles.list
        }
        showsVerticalScrollIndicator={
          false
        }
      />

      <CheckoutFooter
        total={total}
        onPress={
          handlePlaceOrder
        }
      />
    </SafeAreaView>
  );
};

export default CheckoutScreen;
import React, {
  useEffect,
  useState,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { updateOrderStatus } from "../../redux/cartSlice";

const rewards = [
  "₹50 OFF Coupon 🎉",
  "10% OFF Coupon 🔥",
  "Free Shipping 🚚",
  "₹100 OFF Coupon 💸",
  "Better Luck Next Time 🙂",
];

const OrderSuccessScreen = ({
  navigation,
}: any) => {
  const dispatch =
    useDispatch();

  const latestOrder =
    useSelector(
      (state: any) =>
        state.cart.orders[0]
    );

  const [
    scratched,
    setScratched,
  ] = useState(false);

  const [
    reward,
    setReward,
  ] = useState("");

  useEffect(() => {
    if (!latestOrder?.id)
      return;

    const shipTimer =
      setTimeout(() => {
        dispatch(
          updateOrderStatus({
            id: latestOrder.id,
            status:
              "Shipped",
          })
        );
      }, 5000);

    const deliverTimer =
      setTimeout(() => {
        dispatch(
          updateOrderStatus({
            id: latestOrder.id,
            status:
              "Delivered",
          })
        );
      }, 10000);

    return () => {
      clearTimeout(
        shipTimer
      );
      clearTimeout(
        deliverTimer
      );
    };
  }, [latestOrder?.id]);

  const handleScratch =
    () => {
      if (
        scratched
      )
        return;

      const random =
        rewards[
          Math.floor(
            Math.random() *
              rewards.length
          )
        ];

      setReward(
        random
      );
      setScratched(
        true
      );

      Alert.alert(
        "🎁 Reward Unlocked",
        random
      );
    };

  return (
    <SafeAreaView
      style={
        styles.container
      }
    >
      <StatusBar barStyle="dark-content" />

      <View
        style={
          styles.content
        }
      >
        {/* SUCCESS */}
        <View
          style={
            styles.circle
          }
        >
          <Text
            style={
              styles.check
            }
          >
            ✓
          </Text>
        </View>

        <Text
          style={
            styles.title
          }
        >
          Order Placed
          Successfully!
        </Text>

        <Text
          style={
            styles.subtitle
          }
        >
          Thank you for
          your purchase.
        </Text>

        {/* TRACKER */}
        <View
          style={
            styles.trackBox
          }
        >
          <Text
            style={
              styles.stepActive
            }
          >
            📦 Order
            Confirmed
          </Text>

          <Text
            style={
              styles.stepPending
            }
          >
            🚚 Ships in
            5 sec
          </Text>

          <Text
            style={
              styles.stepPending
            }
          >
            ✅ Delivered
            in 10 sec
          </Text>
        </View>

        {/* SCRATCH CARD */}
        <TouchableOpacity
          style={[
            styles.rewardCard,
            scratched &&
              styles.rewardOpen,
          ]}
          onPress={
            handleScratch
          }
        >
          <Text
            style={
              styles.rewardTitle
            }
          >
            {scratched
              ? reward
              : "🎁 Tap to Scratch & Win"}
          </Text>

          <Text
            style={
              styles.rewardSub
            }
          >
            {scratched
              ? "Reward added for demo use"
              : "Get surprise coupon"}
          </Text>
        </TouchableOpacity>

        {/* BUTTONS */}
        <TouchableOpacity
          style={
            styles.button
          }
          onPress={() =>
            navigation.navigate(
              "Tabs",
              {
                screen:
                  "Home",
              }
            )
          }
        >
          <Text
            style={
              styles.buttonText
            }
          >
            Continue
            Shopping
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "Tabs",
              {
                screen:
                  "Orders",
              }
            )
          }
        >
          <Text
            style={
              styles.link
            }
          >
            View My
            Orders
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OrderSuccessScreen;

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#fff",
    },

    content: {
      flex: 1,
      justifyContent:
        "center",
      alignItems:
        "center",
      padding: 20,
    },

    circle: {
      width: 95,
      height: 95,
      borderRadius: 48,
      backgroundColor:
        "#22c55e",
      justifyContent:
        "center",
      alignItems:
        "center",
      marginBottom: 18,
    },

    check: {
      fontSize: 44,
      color: "#fff",
      fontWeight:
        "700",
    },

    title: {
      fontSize: 24,
      fontWeight:
        "700",
      textAlign:
        "center",
    },

    subtitle: {
      fontSize: 15,
      color: "gray",
      marginTop: 8,
      marginBottom: 20,
    },

    trackBox: {
      width: "100%",
      backgroundColor:
        "#f8f8f8",
      padding: 16,
      borderRadius: 14,
      marginBottom: 18,
    },

    stepActive: {
      color: "#22c55e",
      fontWeight:
        "700",
      marginBottom: 10,
    },

    stepPending: {
      color: "#555",
      marginBottom: 10,
    },

    rewardCard: {
      width: "100%",
      backgroundColor:
        "#111",
      borderRadius: 16,
      padding: 18,
      alignItems:
        "center",
      marginBottom: 18,
    },

    rewardOpen: {
      backgroundColor:
        "#f59e0b",
    },

    rewardTitle: {
      color: "#fff",
      fontSize: 17,
      fontWeight:
        "700",
      textAlign:
        "center",
    },

    rewardSub: {
      color: "#eee",
      marginTop: 6,
      fontSize: 13,
    },

    button: {
      backgroundColor:
        "#111",
      paddingVertical: 14,
      paddingHorizontal: 35,
      borderRadius: 12,
      marginBottom: 12,
    },

    buttonText: {
      color: "#fff",
      fontWeight:
        "700",
      fontSize: 15,
    },

    link: {
      color: "#111",
      fontWeight:
        "600",
      fontSize: 14,
    },
  });
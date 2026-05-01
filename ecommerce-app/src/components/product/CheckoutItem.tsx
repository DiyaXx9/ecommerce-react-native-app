import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";

import API from "../../api/axios";
import { setCart } from "../../redux/cartSlice";

// ✅ FALLBACK IMAGE
const FALLBACK_IMAGE =
  "https://dummyimage.com/300x300/cccccc/000000&text=No+Image";

const CheckoutItem = ({ item }: any) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!item) return null;

  // ✅ SAFE IMAGE
  const imageUrl =
    !imgError && item.product?.image
      ? item.product.image
      : FALLBACK_IMAGE;

  const handleIncrease = async () => {
    try {
      setLoading(true);

      const res = await API.put("/cart", {
        productId: item.product._id,
        qty: (item.quantity || 1) + 1,
      });

      dispatch(setCart({ items: res.data.items }));
    } catch (error) {
      console.log("Increase Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrease = async () => {
    try {
      if ((item.quantity || 1) <= 1) return;

      setLoading(true);

      const res = await API.put("/cart", {
        productId: item.product._id,
        qty: item.quantity - 1,
      });

      dispatch(setCart({ items: res.data.items }));
    } catch (error) {
      console.log("Decrease Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    try {
      setLoading(true);

      const res = await API.delete(`/cart/${item.product._id}`);

      dispatch(setCart({ items: res.data.items }));
    } catch (error) {
      console.log("Remove Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      {/* 🖼 IMAGE */}
      <Image
        source={{ uri: imageUrl }}
        onError={() => setImgError(true)}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.info}>
        <Text style={styles.name}>
          {item.product?.name || "Product"}
        </Text>

        <Text style={styles.price}>
          ₹{item.product?.price || 0}
        </Text>

        {/* 🔢 QTY */}
        <View style={styles.qtyContainer}>
          <TouchableOpacity onPress={handleDecrease} disabled={loading}>
            <Text style={styles.btn}>-</Text>
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="small" />
          ) : (
            <Text style={styles.qty}>{item.quantity || 1}</Text>
          )}

          <TouchableOpacity onPress={handleIncrease} disabled={loading}>
            <Text style={styles.btn}>+</Text>
          </TouchableOpacity>
        </View>

        {/* ❌ REMOVE */}
        <TouchableOpacity onPress={handleRemove} disabled={loading}>
          <Text style={styles.remove}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  info: {
    marginLeft: 12,
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    marginVertical: 4,
    color: "green",
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  btn: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  qty: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  remove: {
    color: "red",
    marginTop: 8,
  },
});
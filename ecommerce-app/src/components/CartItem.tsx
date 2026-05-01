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

import API from "../api/axios";
import { setCart } from "../redux/cartSlice";

const FALLBACK_IMAGE =
  "https://dummyimage.com/200x200/cccccc/000000&text=No+Image";

const CartItem = ({ item }: any) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  if (!item) return null;

  const handleIncrease = async () => {
    try {
      setLoading(true);

      const res = await API.put("/cart", {
        productId: item.product._id,
        qty: item.quantity + 1,
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
      if (item.quantity <= 1) return;

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
      {/* LEFT IMAGE */}
      <Image
        source={{ uri: item.product?.image || FALLBACK_IMAGE }}
        style={styles.image}
        resizeMode="contain"
      />

      {/* RIGHT CONTENT */}
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.name}>
          {item.product?.name}
        </Text>

        <Text style={styles.price}>₹{item.product?.price}</Text>

        {/* QUANTITY CONTROLS */}
        <View style={styles.row}>
          <View style={styles.qtyBox}>
            <TouchableOpacity
              onPress={handleDecrease}
              disabled={loading}
              style={styles.qtyBtn}
            >
              <Text style={styles.qtyText}>−</Text>
            </TouchableOpacity>

            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={styles.qty}>{item.quantity}</Text>
            )}

            <TouchableOpacity
              onPress={handleIncrease}
              disabled={loading}
              style={styles.qtyBtn}
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* REMOVE BUTTON */}
          <TouchableOpacity onPress={handleRemove} disabled={loading}>
            <Text style={styles.remove}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  image: {
    width: 90,
    height: 90,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },

  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },

  name: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
  },

  qtyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  qtyText: {
    fontSize: 18,
    fontWeight: "600",
  },

  qty: {
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: "600",
  },

  remove: {
    color: "#e53935",
    fontWeight: "600",
  },
});
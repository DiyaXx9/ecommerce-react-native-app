import React, { useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Animated,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import API from "../../api/axios";
import { setCart } from "../../redux/cartSlice";
import { toggleWishlist } from "../../redux/wishlistSlice";
import { RootState } from "../../redux/store";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 18;

const FALLBACK_IMAGE =
  "https://dummyimage.com/300x300/cccccc/000000&text=No+Image";

const ProductCard = ({ product }: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items
  );

  const isWishlisted = wishlistItems.some(
    (item) => item._id === product._id
  );

  const handleWishlist = async () => {
    dispatch(toggleWishlist(product));

    const existing = await AsyncStorage.getItem("wishlist");
    let wishlist = existing ? JSON.parse(existing) : [];

    const exists = wishlist.find(
      (i: any) => i._id === product._id
    );

    if (exists) {
      wishlist = wishlist.filter(
        (i: any) => i._id !== product._id
      );
    } else {
      wishlist.push(product);
    }

    await AsyncStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  };

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      const res = await API.post("/cart", {
        productId: product._id,
        qty: 1,
      });

      dispatch(setCart({ items: res.data.items }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const imageUrl =
    !imgError && product?.images?.[0]
      ? product.images[0]
      : FALLBACK_IMAGE;

  const originalPrice =
    Math.round(product.price * 1.25);

  const discount =
    Math.round(
      ((originalPrice - product.price) /
        originalPrice) *
        100
    );

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.95}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() =>
          navigation.navigate(
            "ProductDetails",
            { product }
          )
        }
      >
        {/* Wishlist */}
        <TouchableOpacity
          style={styles.heart}
          onPress={handleWishlist}
        >
          <Ionicons
            name={
              isWishlisted
                ? "heart"
                : "heart-outline"
            }
            size={18}
            color={
              isWishlisted
                ? "#ff3b30"
                : "#555"
            }
          />
        </TouchableOpacity>

        {/* Discount */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {discount}% OFF
          </Text>
        </View>

        {/* Image */}
        <View style={styles.imageWrap}>
          {imgLoading && (
            <View style={styles.skeleton} />
          )}

          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
            onLoadEnd={() =>
              setImgLoading(false)
            }
            onError={() => {
              setImgError(true);
              setImgLoading(false);
            }}
          />
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text
            numberOfLines={2}
            style={styles.name}
          >
            {product.name}
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>
              ₹{product.price}
            </Text>

            <Text style={styles.oldPrice}>
              ₹{originalPrice}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={handleAddToCart}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>
                Add to Cart
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 14,
    overflow: "hidden",
    elevation: 5,
  },

  heart: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 5,
    backgroundColor: "#fff",
    padding: 7,
    borderRadius: 20,
  },

  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 5,
    backgroundColor: "#22c55e",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },

  imageWrap: {
    height: 150,
    backgroundColor: "#f1f1f1",
  },

  skeleton: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ddd",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  info: {
    padding: 12,
  },

  name: {
    fontSize: 14,
    color: "#222",
    minHeight: 38,
    fontWeight: "600",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  price: {
    fontSize: 17,
    fontWeight: "700",
    color: "#000",
  },

  oldPrice: {
    fontSize: 12,
    color: "#888",
    textDecorationLine: "line-through",
    marginLeft: 6,
  },

  btn: {
    backgroundColor: "#111",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 13,
  },
});
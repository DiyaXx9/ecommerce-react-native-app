import React, {
  useEffect,
  useState,
} from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../redux/cartSlice";

const { width } =
  Dimensions.get("window");

const ProductDetailScreen = ({
  route,
  navigation,
}: any) => {
  const dispatch =
    useDispatch();

  const { product } =
    route.params;

  const cartItems =
    useSelector(
      (state: any) =>
        state.cart
          .cartItems
    );

  const images =
    product?.images ||
    [];

  const [index, setIndex] =
    useState(0);

  const [reviews, setReviews] =
    useState<any[]>(
      []
    );

  const [name, setName] =
    useState("");

  const [comment, setComment] =
    useState("");

  useEffect(() => {
    saveRecent();
    loadReviews();
  }, []);

  // RECENTLY VIEWED
  const saveRecent =
    async () => {
      try {
        const old =
          await AsyncStorage.getItem(
            "recent"
          );

        let data = old
          ? JSON.parse(old)
          : [];

        data =
          data.filter(
            (
              item: any
            ) =>
              item._id !==
              product._id
          );

        data.unshift(
          product
        );

        if (
          data.length >
          6
        ) {
          data =
            data.slice(
              0,
              6
            );
        }

        await AsyncStorage.setItem(
          "recent",
          JSON.stringify(
            data
          )
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  // LOAD REVIEWS
  const loadReviews =
    async () => {
      const data =
        await AsyncStorage.getItem(
          `reviews_${product._id}`
        );

      if (data) {
        setReviews(
          JSON.parse(
            data
          )
        );
      }
    };

  // SUBMIT REVIEW
  const submitReview =
    async () => {
      if (
        !name ||
        !comment
      ) {
        Alert.alert(
          "Fill all fields"
        );
        return;
      }

      const newReview = {
        id: Date.now(),
        name,
        comment,
      };

      const updated = [
        newReview,
        ...reviews,
      ];

      setReviews(
        updated
      );

      await AsyncStorage.setItem(
        `reviews_${product._id}`,
        JSON.stringify(
          updated
        )
      );

      setName("");
      setComment("");

      Alert.alert(
        "Review Added ⭐"
      );
    };

  // ADD TO CART
  const addToCart =
    () => {
      const exists =
        cartItems.find(
          (
            item: any
          ) =>
            item.product
              ._id ===
            product._id
        );

      let updated =
        [];

      if (exists) {
        updated =
          cartItems.map(
            (
              item: any
            ) =>
              item
                .product
                ._id ===
              product._id
                ? {
                    ...item,
                    quantity:
                      item.quantity +
                      1,
                  }
                : item
          );
      } else {
        updated = [
          ...cartItems,
          {
            _id: product._id,
            product:
              product,
            quantity: 1,
          },
        ];
      }

      dispatch(
        setCart({
          items:
            updated,
        })
      );

      Alert.alert(
        "Added to Cart 🛒"
      );
    };

  // BUY NOW
  const buyNow =
    () => {
      dispatch(
        setCart({
          items: [
            {
              _id: product._id,
              product,
              quantity: 1,
            },
          ],
        })
      );

      navigation.navigate(
        "Checkout"
      );
    };

  return (
    <ScrollView
      style={
        styles.container
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      {/* IMAGES */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={
          false
        }
        onScroll={(
          e
        ) => {
          const i =
            Math.round(
              e
                .nativeEvent
                .contentOffset
                .x /
                width
            );

          setIndex(
            i
          );
        }}
      >
        {images.map(
          (
            img: string,
            i: number
          ) => (
            <Image
              key={i}
              source={{
                uri: img,
              }}
              style={
                styles.image
              }
            />
          )
        )}
      </ScrollView>

      {/* DOTS */}
      <View
        style={
          styles.dotRow
        }
      >
        {images.map(
          (
            _: any,
            i: number
          ) => (
            <View
              key={i}
              style={[
                styles.dot,
                index ===
                  i &&
                  styles.activeDot,
              ]}
            />
          )
        )}
      </View>

      <View
        style={
          styles.info
        }
      >
        {/* PRODUCT INFO */}
        <Text
          style={
            styles.name
          }
        >
          {
            product.name
          }
        </Text>

        <Text
          style={
            styles.price
          }
        >
          ₹
          {
            product.price
          }
        </Text>

        <Text
          style={
            styles.desc
          }
        >
          {product.description ||
            "Best quality product for daily use."}
        </Text>

        {/* BUTTONS */}
        <View
          style={
            styles.row
          }
        >
          <TouchableOpacity
            style={
              styles.cartBtn
            }
            onPress={
              addToCart
            }
          >
            <Text
              style={
                styles.btnText
              }
            >
              Add to Cart
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.buyBtn
            }
            onPress={
              buyNow
            }
          >
            <Text
              style={
                styles.btnText
              }
            >
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>

        {/* REVIEWS */}
        <Text
          style={
            styles.reviewTitle
          }
        >
          Customer Reviews ⭐
        </Text>

        <TextInput
          placeholder="Your Name"
          value={name}
          onChangeText={
            setName
          }
          style={
            styles.input
          }
        />

        <TextInput
          placeholder="Write Review..."
          value={comment}
          onChangeText={
            setComment
          }
          style={
            styles.input
          }
        />

        <TouchableOpacity
          onPress={
            submitReview
          }
          style={
            styles.submitBtn
          }
        >
          <Text
            style={
              styles.btnText
            }
          >
            Submit Review
          </Text>
        </TouchableOpacity>

        {reviews.map(
          (
            item: any
          ) => (
            <View
              key={
                item.id
              }
              style={
                styles.reviewCard
              }
            >
              <Text
                style={
                  styles.reviewName
                }
              >
                ⭐{" "}
                {
                  item.name
                }
              </Text>

              <Text>
                {
                  item.comment
                }
              </Text>
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#fff",
    },

    image: {
      width:
        width,
      height: 320,
      resizeMode:
        "contain",
      backgroundColor:
        "#f5f5f5",
    },

    dotRow: {
      flexDirection:
        "row",
      justifyContent:
        "center",
      marginTop: 10,
    },

    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor:
        "#ccc",
      marginHorizontal: 4,
    },

    activeDot: {
      width: 18,
      backgroundColor:
        "#000",
    },

    info: {
      padding: 16,
    },

    name: {
      fontSize: 22,
      fontWeight:
        "700",
      marginBottom: 8,
    },

    price: {
      fontSize: 24,
      fontWeight:
        "700",
      marginBottom: 12,
    },

    desc: {
      color: "#666",
      lineHeight: 22,
      marginBottom: 20,
    },

    row: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      marginBottom: 25,
    },

    cartBtn: {
      flex: 1,
      backgroundColor:
        "#000",
      padding: 15,
      borderRadius: 10,
      alignItems:
        "center",
      marginRight: 8,
    },

    buyBtn: {
      flex: 1,
      backgroundColor:
        "#fb641b",
      padding: 15,
      borderRadius: 10,
      alignItems:
        "center",
      marginLeft: 8,
    },

    btnText: {
      color: "#fff",
      fontWeight:
        "700",
      fontSize: 15,
    },

    reviewTitle: {
      fontSize: 18,
      fontWeight:
        "700",
      marginBottom: 12,
    },

    input: {
      borderWidth: 1,
      borderColor:
        "#ddd",
      borderRadius: 10,
      padding: 12,
      marginBottom: 10,
    },

    submitBtn: {
      backgroundColor:
        "#000",
      padding: 14,
      borderRadius: 10,
      alignItems:
        "center",
      marginBottom: 15,
    },

    reviewCard: {
      backgroundColor:
        "#f5f5f5",
      padding: 12,
      borderRadius: 10,
      marginBottom: 10,
    },

    reviewName: {
      fontWeight:
        "700",
      marginBottom: 4,
    },
  });
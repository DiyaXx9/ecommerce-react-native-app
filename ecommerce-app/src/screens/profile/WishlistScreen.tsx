import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useSelector,
  useDispatch,
} from "react-redux";

import { RootState } from "../../redux/store";
import ProductCard from "../../components/product/ProductCard";
import { clearWishlist } from "../../redux/wishlistSlice";

const WishlistScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items
  );

  const handleShare = async () => {
    const text = wishlistItems
      .map((item) => `${item.name} - ₹${item.price}`)
      .join("\n");

    await Share.share({
      message: "🛍 My Wishlist:\n\n" + text,
    });
  };

  const handleClear = () => {
    Alert.alert(
      "Clear Wishlist",
      "Remove all items?",
      [
        { text: "Cancel" },
        {
          text: "Yes",
          onPress: () => dispatch(clearWishlist()),
        },
      ]
    );
  };

  const Header = () =>
    wishlistItems.length > 0 ? (
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.shareBtn}
          onPress={handleShare}
        >
          <Text style={styles.btnText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearBtn}
          onPress={handleClear}
        >
          <Text style={styles.btnText}>Clear All</Text>
        </TouchableOpacity>
      </View>
    ) : null;

  if (wishlistItems.length === 0) {
    return (
      <SafeAreaView style={styles.empty}>
        <Text style={styles.emoji}>❤️</Text>
        <Text style={styles.title}>Wishlist Empty</Text>
        <Text style={styles.sub}>
          Add your favorite items
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={wishlistItems}
        keyExtractor={(item) => item._id}
        numColumns={2}
        ListHeaderComponent={Header}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            navigation={navigation}
          />
        )}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        contentContainerStyle={{
          paddingBottom: 30,
          paddingTop: 10,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
  },

  topBar: {
    flexDirection: "row",
    marginBottom: 15,
    marginTop: 5,
  },

  shareBtn: {
    flex: 1,
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 10,
    marginRight: 6,
    alignItems: "center",
  },

  clearBtn: {
    flex: 1,
    backgroundColor: "#ff3b30",
    padding: 12,
    borderRadius: 10,
    marginLeft: 6,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },

  empty: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },

  emoji: {
    fontSize: 50,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },

  sub: {
    color: "#777",
    marginTop: 5,
  },
});
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

const OrderDetailsScreen = ({ route }: any) => {
  const { order } = route.params;

  const date = new Date(
    order.createdAt
  ).toLocaleString();

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.card}>
        <Text style={styles.title}>
          Order #{order.id}
        </Text>

        <Text style={styles.sub}>
          📅 {date}
        </Text>

        <Text style={styles.success}>
          Delivered ✅
        </Text>
      </View>

      {/* PRODUCTS */}
      <View style={styles.card}>
        <Text style={styles.section}>
          Products
        </Text>

        <FlatList
          data={order.items}
          scrollEnabled={false}
          keyExtractor={(item) =>
            item.product._id
          }
          renderItem={({ item }) => (
            <View style={styles.item}>
              {item.product.image ? (
                <Image
                  source={{
                    uri: item.product.image,
                  }}
                  style={styles.image}
                />
              ) : (
                <View
                  style={styles.placeholder}
                >
                  <Text>📦</Text>
                </View>
              )}

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>
                  {item.product.name}
                </Text>

                <Text>
                  Qty: {item.quantity}
                </Text>

                <Text>
                  ₹{item.product.price}
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* PRICE */}
      <View style={styles.card}>
        <Text style={styles.section}>
          Payment Summary
        </Text>

        <Text style={styles.total}>
          Total Paid: ₹
          {order.totalPrice}
        </Text>
      </View>
    </ScrollView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 12,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  sub: {
    color: "#666",
    marginTop: 5,
  },

  success: {
    color: "green",
    marginTop: 8,
    fontWeight: "600",
  },

  section: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  item: {
    flexDirection: "row",
    marginBottom: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 10,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },

  placeholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontWeight: "600",
    marginBottom: 6,
  },

  total: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
});
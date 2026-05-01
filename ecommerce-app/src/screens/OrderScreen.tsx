import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import {
  useSelector,
  useDispatch,
} from "react-redux";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import {
  setCart,
  cancelOrder,
} from "../redux/cartSlice";

const OrderScreen = ({
  navigation,
}: any) => {
  const dispatch =
    useDispatch();

  const orders =
    useSelector(
      (state: any) =>
        state.cart.orders
    );

  const handleReorder =
    (order: any) => {
      dispatch(
        setCart({
          items:
            order.items,
        })
      );

      Alert.alert(
        "Success",
        "Items added to cart 🛒"
      );

      navigation.navigate(
        "Tabs",
        {
          screen:
            "Cart",
        }
      );
    };

  const handleCancel =
    (id: string) => {
      Alert.alert(
        "Cancel Order",
        "Are you sure?",
        [
          {
            text: "No",
          },
          {
            text: "Yes",
            onPress:
              () => {
                dispatch(
                  cancelOrder(
                    id
                  )
                );
              },
          },
        ]
      );
    };

  const handleDownloadInvoice =
    async (order: any) => {
      try {
        const itemsHtml =
          order.items
            ?.map(
              (
                item: any,
                index: number
              ) => `
            <tr>
              <td>${index + 1}</td>
              <td>${item.title || item.name}</td>
              <td>${item.quantity || 1}</td>
              <td>₹${item.price}</td>
            </tr>
          `
            )
            .join("");

        const html =
          `
        <html>
          <body style="font-family: Arial; padding: 24px;">
            <h1 style="text-align:center;">
              MyShop Invoice
            </h1>

            <hr />

            <h3>Order Details</h3>
            <p><b>Order ID:</b> ${
              order.id
            }</p>
            <p><b>Date:</b> ${new Date(
              order.createdAt
            ).toLocaleDateString()}</p>
            <p><b>Status:</b> ${
              order.status
            }</p>

            <h3>Items</h3>

            <table
              border="1"
              cellspacing="0"
              cellpadding="8"
              width="100%"
            >
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>

              ${itemsHtml}
            </table>

            <h2 style="margin-top:20px;">
              Total: ₹${
                order.totalPrice
              }
            </h2>

            <p>
              GST Included
            </p>

            <br />

            <p>
              Thank you for shopping with us ❤️
            </p>
          </body>
        </html>
      `;

        const file =
          await Print.printToFileAsync(
            {
              html,
            }
          );

        await Sharing.shareAsync(
          file.uri
        );
      } catch (error) {
        Alert.alert(
          "Error",
          "Unable to generate invoice"
        );
      }
    };

  const renderItem = ({
    item,
  }: any) => {
    const date =
      new Date(
        item.createdAt
      ).toLocaleDateString();

    return (
      <View
        style={
          styles.card
        }
      >
        <View
          style={
            styles.rowBetween
          }
        >
          <Text
            style={
              styles.id
            }
          >
            Order #
            {item.id}
          </Text>

          <Text
            style={
              styles.status
            }
          >
            {item.status ===
              "Placed" &&
              "📦 Placed"}

            {item.status ===
              "Shipped" &&
              "🚚 Shipped"}

            {item.status ===
              "Delivered" &&
              "✅ Delivered"}

            {item.status ===
              "Cancelled" &&
              "❌ Cancelled"}
          </Text>
        </View>

        <Text
          style={
            styles.text
          }
        >
          🛒 Items:{" "}
          {
            item.items
              .length
          }
        </Text>

        <Text
          style={
            styles.text
          }
        >
          💰 Total: ₹
          {
            item.totalPrice
          }
        </Text>

        <Text
          style={
            styles.date
          }
        >
          📅 {date}
        </Text>

        <View
          style={
            styles.btnRow
          }
        >
          <TouchableOpacity
            style={
              styles.detailsBtn
            }
            onPress={() =>
              navigation.navigate(
                "OrderDetails",
                {
                  order:
                    item,
                }
              )
            }
          >
            <Text
              style={
                styles.btnText
              }
            >
              Details
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.reorderBtn
            }
            onPress={() =>
              handleReorder(
                item
              )
            }
          >
            <Text
              style={
                styles.btnText
              }
            >
              Reorder
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={
            styles.btnRow
          }
        >
          <TouchableOpacity
            style={
              styles.invoiceBtn
            }
            onPress={() =>
              handleDownloadInvoice(
                item
              )
            }
          >
            <Text
              style={
                styles.btnText
              }
            >
              Invoice PDF
            </Text>
          </TouchableOpacity>

          {item.status ===
            "Placed" && (
            <TouchableOpacity
              style={
                styles.cancelBtn
              }
              onPress={() =>
                handleCancel(
                  item.id
                )
              }
            >
              <Text
                style={
                  styles.btnText
                }
              >
                Cancel
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View
      style={
        styles.container
      }
    >
      {orders.length ===
      0 ? (
        <View
          style={
            styles.empty
          }
        >
          <Text
            style={
              styles.emptyText
            }
          >
            No Orders Yet 😢
          </Text>
        </View>
      ) : (
        <FlatList
          data={
            orders
          }
          keyExtractor={(
            item
          ) =>
            item.id
          }
          renderItem={
            renderItem
          }
          showsVerticalScrollIndicator={
            false
          }
        />
      )}
    </View>
  );
};

export default OrderScreen;

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#f5f5f5",
      padding: 12,
    },

    card: {
      backgroundColor:
        "#fff",
      padding: 16,
      borderRadius: 14,
      marginBottom: 14,
    },

    rowBetween: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      marginBottom: 10,
    },

    id: {
      fontWeight:
        "700",
      fontSize: 16,
    },

    status: {
      color: "green",
      fontSize: 13,
      fontWeight:
        "600",
    },

    text: {
      marginBottom: 5,
      color: "#444",
    },

    date: {
      color: "#888",
      marginTop: 6,
    },

    btnRow: {
      flexDirection:
        "row",
      marginTop: 10,
    },

    detailsBtn: {
      flex: 1,
      backgroundColor:
        "#000",
      padding: 10,
      borderRadius: 8,
      alignItems:
        "center",
      marginRight: 5,
    },

    reorderBtn: {
      flex: 1,
      backgroundColor:
        "#fb641b",
      padding: 10,
      borderRadius: 8,
      alignItems:
        "center",
      marginLeft: 5,
    },

    invoiceBtn: {
      flex: 1,
      backgroundColor:
        "#2e7d32",
      padding: 10,
      borderRadius: 8,
      alignItems:
        "center",
      marginRight: 5,
    },

    cancelBtn: {
      flex: 1,
      backgroundColor:
        "#ff3b30",
      padding: 10,
      borderRadius: 8,
      alignItems:
        "center",
      marginLeft: 5,
    },

    btnText: {
      color: "#fff",
      fontWeight:
        "600",
      fontSize: 13,
    },

    empty: {
      flex: 1,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    emptyText: {
      fontSize: 18,
      fontWeight:
        "700",
    },
  });
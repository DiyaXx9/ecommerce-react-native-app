import React, {
  useState,
  useMemo,
} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useAppSelector } from "../../hooks/useAppSelector";
import ProductCard from "../../components/product/ProductCard";

const quickPrompts = [
  "Shoes under 3000",
  "Gift for brother",
  "College outfit",
  "Electronics under 5000",
];

const AIStylistScreen = () => {
  const { products } =
    useAppSelector(
      (state) => state.product
    );

  const [query, setQuery] =
    useState("");

  const [
    messages,
    setMessages,
  ] = useState<any[]>([
    {
      id: "1",
      type: "bot",
      text: "Hi Diya 👋 I'm your AI Stylist. Tell me what you need today.",
    },
  ]);

  const [
    results,
    setResults,
  ] = useState<any[]>([]);

  const extractBudget = (
    text: string
  ) => {
    const match =
      text.match(/\d+/);

    return match
      ? Number(
          match[0]
        )
      : null;
  };

  const getMatches = (
    text: string
  ) => {
    const lower =
      text.toLowerCase();

    const budget =
      extractBudget(
        lower
      );

    let filtered =
      [...products];

    if (
      lower.includes(
        "shoe"
      )
    ) {
      filtered =
        filtered.filter(
          (
            item: any
          ) =>
            item.category?.toLowerCase() ===
            "shoes"
        );
    }

    if (
      lower.includes(
        "cloth"
      ) ||
      lower.includes(
        "outfit"
      ) ||
      lower.includes(
        "college"
      )
    ) {
      filtered =
        filtered.filter(
          (
            item: any
          ) =>
            item.category?.toLowerCase() ===
            "clothing"
        );
    }

    if (
      lower.includes(
        "electronic"
      ) ||
      lower.includes(
        "phone"
      ) ||
      lower.includes(
        "gift"
      )
    ) {
      filtered =
        filtered.filter(
          (
            item: any
          ) =>
            item.category?.toLowerCase() ===
            "electronics" ||
            item.category?.toLowerCase() ===
            "accessories"
        );
    }

    if (
      budget
    ) {
      filtered =
        filtered.filter(
          (
            item: any
          ) =>
            item.price <=
            budget
        );
    }

    return filtered.slice(
      0,
      6
    );
  };

  const sendMessage =
    (
      customText?: string
    ) => {
      const text =
        customText ||
        query;

      if (
        !text.trim()
      )
        return;

      const userMsg =
        {
          id:
            Date.now().toString(),
          type: "user",
          text,
        };

      const matched =
        getMatches(
          text
        );

      const botMsg =
        {
          id:
            Date.now().toString() +
            "bot",
          type: "bot",
          text:
            matched.length >
            0
              ? `I found ${matched.length} products for "${text}".`
              : `Sorry, I couldn't find products for "${text}". Try another search.`,
        };

      setMessages(
        (
          prev
        ) => [
          ...prev,
          userMsg,
          botMsg,
        ]
      );

      setResults(
        matched
      );

      setQuery(
        ""
      );
    };

  return (
    <KeyboardAvoidingView
      style={
        styles.container
      }
      behavior={
        Platform.OS ===
        "ios"
          ? "padding"
          : undefined
      }
    >
      {/* HEADER */}
      <View
        style={
          styles.header
        }
      >
        <View
          style={
            styles.botCircle
          }
        >
          <Ionicons
            name="sparkles"
            size={20}
            color="#fff"
          />
        </View>

        <View>
          <Text
            style={
              styles.headerTitle
            }
          >
            AI Stylist
          </Text>

          <Text
            style={
              styles.headerSub
            }
          >
            Smart shopping assistant
          </Text>
        </View>
      </View>

      {/* QUICK PROMPTS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.promptRow
        }
      >
        {quickPrompts.map(
          (
            item
          ) => (
            <TouchableOpacity
              key={
                item
              }
              style={
                styles.promptChip
              }
              onPress={() =>
                sendMessage(
                  item
                )
              }
            >
              <Text
                style={
                  styles.promptText
                }
              >
                {item}
              </Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      {/* CHAT */}
      <FlatList
        data={
          messages
        }
        keyExtractor={(
          item
        ) =>
          item.id
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          padding: 14,
          paddingBottom: 8,
        }}
        renderItem={({
          item,
        }) => (
          <View
            style={[
              styles.msgWrap,
              item.type ===
                "user"
                ? styles.userWrap
                : styles.botWrap,
            ]}
          >
            <Text
              style={[
                styles.msgText,
                item.type ===
                  "user" &&
                  styles.userText,
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
      />

      {/* PRODUCTS */}
      {results.length >
        0 && (
        <FlatList
          data={
            results
          }
          horizontal
          keyExtractor={(
            item: any
          ) =>
            item._id
          }
          renderItem={({
            item,
          }) => (
            <View
              style={{
                width: 180,
                marginLeft: 10,
              }}
            >
              <ProductCard
                product={
                  item
                }
              />
            </View>
          )}
          showsHorizontalScrollIndicator={
            false
          }
          contentContainerStyle={{
            paddingBottom: 8,
          }}
        />
      )}

      {/* INPUT */}
      <View
        style={
          styles.inputRow
        }
      >
        <TextInput
          placeholder="Ask for products..."
          value={
            query
          }
          onChangeText={
            setQuery
          }
          style={
            styles.input
          }
        />

        <TouchableOpacity
          style={
            styles.sendBtn
          }
          onPress={() =>
            sendMessage()
          }
        >
          <Ionicons
            name="send"
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AIStylistScreen;

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#f5f5f5",
    },

    header: {
      backgroundColor:
        "#111",
      paddingTop: 18,
      paddingBottom: 16,
      paddingHorizontal: 16,
      flexDirection:
        "row",
      alignItems:
        "center",
    },

    botCircle: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor:
        "#00A8E1",
      justifyContent:
        "center",
      alignItems:
        "center",
      marginRight: 12,
    },

    headerTitle: {
      color: "#fff",
      fontSize: 18,
      fontWeight:
        "700",
    },

    headerSub: {
      color: "#bbb",
      fontSize: 12,
      marginTop: 2,
    },

    promptRow: {
      paddingHorizontal: 10,
      paddingVertical: 10,
    },

    promptChip: {
      backgroundColor:
        "#fff",
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 20,
      marginRight: 8,
    },

    promptText: {
      fontWeight:
        "600",
      fontSize: 12,
    },

    msgWrap: {
      maxWidth:
        "78%",
      padding: 12,
      borderRadius: 14,
      marginBottom: 10,
    },

    userWrap: {
      backgroundColor:
        "#111",
      alignSelf:
        "flex-end",
    },

    botWrap: {
      backgroundColor:
        "#fff",
      alignSelf:
        "flex-start",
    },

    msgText: {
      color: "#111",
      fontSize: 14,
    },

    userText: {
      color: "#fff",
    },

    inputRow: {
      flexDirection:
        "row",
      padding: 10,
      backgroundColor:
        "#fff",
      alignItems:
        "center",
    },

    input: {
      flex: 1,
      backgroundColor:
        "#f2f2f2",
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },

    sendBtn: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor:
        "#111",
      justifyContent:
        "center",
      alignItems:
        "center",
      marginLeft: 10,
    },
  });
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // 🌍 MAIN CONTAINER
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },

  // 📦 CARD (used everywhere)
  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 12,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    elevation: 2, // Android shadow
  },

  // 🔠 SECTION TITLE
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },

  // 🔁 ROW SPACE BETWEEN
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  // 👤 NAME
  name: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 6,
    color: "#111",
  },

  // 📍 ADDRESS TEXT
  address: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },

  // 📞 PHONE
  phone: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },

  // 🔁 CHANGE BUTTON TEXT
  changeBtnText: {
    color: "#fb641b",
    fontWeight: "700",
    fontSize: 13,
  },

  // ❌ ERROR TEXT
  errorText: {
    color: "red",
    marginTop: 6,
    fontSize: 13,
  },

  // 📜 LIST (FlatList spacing)
  list: {
    paddingBottom: 120, // space for footer
  },

  // ➖ DIVIDER
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },

  // 💸 FREE TEXT
  free: {
    color: "green",
    fontWeight: "600",
  },

  // 💰 TOTAL LABEL
  totalLabel: {
    fontWeight: "600",
    fontSize: 15,
  },

  // 💰 TOTAL AMOUNT
  totalAmount: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#111",
  },

  // 🔻 FOOTER (STICKY)
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  // 💰 FOOTER PRICE
  footerPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
  },

  // 🧾 FOOTER SUBTEXT
  footerSub: {
    fontSize: 12,
    color: "#777",
  },

  // 🔘 BUTTON
  button: {
    backgroundColor: "#fb641b",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
  },

  // 🔘 BUTTON TEXT
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
});
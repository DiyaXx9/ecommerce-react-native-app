import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:5000/api"
    : "http://172.26.132.117:5000/api";

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

// 🔥 FIX: use synchronous-like handling
API.interceptors.request.use(
  async (req) => {
    try {
      let token;

      if (Platform.OS === "web") {
        token = localStorage.getItem("token");
      } else {
        token = await SecureStore.getItemAsync("token");
      }

      console.log("🔐 TOKEN FROM STORAGE:", token);

      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log("❌ TOKEN NOT FOUND");
      }

      return req;
    } catch (err) {
      console.log("❌ INTERCEPTOR ERROR:", err);
      return req;
    }
  },
  (error) => Promise.reject(error)
);

export default API;
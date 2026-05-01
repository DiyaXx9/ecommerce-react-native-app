import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import API from "../../api/axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      console.log("🚀 Sending request to:", API.defaults.baseURL);

      const { data } = await API.post("/auth/login", {
        email: email.toLowerCase().trim(),
        password: password.trim(),
      });

      console.log("✅ LOGIN SUCCESS:", data);

      // ✅ Store token FIRST
      if (Platform.OS === "web") {
        localStorage.setItem("token", data.token);
      } else {
        await SecureStore.setItemAsync("token", data.token);
      }

      // 🔥 Small delay (important for interceptor sync)
      await new Promise((resolve) => setTimeout(resolve, 200));

      // ✅ Save in Redux
      dispatch(
        loginSuccess({
          token: data.token,
          user: data,
        })
      );

      console.log("✅ TOKEN STORED SUCCESSFULLY");

      // ✅ Navigate
      navigation.replace("Tabs");

    } catch (error: any) {
      console.log("❌ LOGIN ERROR:", error?.response?.data || error.message);
      alert(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
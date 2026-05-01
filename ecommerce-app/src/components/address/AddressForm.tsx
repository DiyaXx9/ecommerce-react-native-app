import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

interface Props {
  onSubmit: (data: any) => void;
  initialData?: any;
}

const AddressForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: "",
  });

  // ✅ FIX: always sync initialData safely
  useEffect(() => {
    if (initialData) {
      setForm({
        fullName: initialData.fullName ?? "",
        phone: initialData.phone ?? "",
        pincode: initialData.pincode ?? "",
        addressLine: initialData.addressLine ?? "",
        city: initialData.city ?? "",
        state: initialData.state ?? "",
      });
    }
  }, [initialData]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value || "", // NEVER undefined
    }));
  };

  const handleSubmit = () => {
    if (Object.values(form).some((val) => val.trim() === "")) {
      alert("Please fill all fields");
      return;
    }

    onSubmit(form);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {[
          { key: "fullName", label: "Full Name" },
          { key: "phone", label: "Phone", numeric: true },
          { key: "pincode", label: "Pincode", numeric: true },
          { key: "addressLine", label: "Address" },
          { key: "city", label: "City" },
          { key: "state", label: "State" },
        ].map((field) => (
          <View key={field.key} style={styles.inputWrapper}>
            <Text style={styles.label}>{field.label}</Text>

            <TextInput
              style={styles.input}
              value={(form as any)[field.key] ?? ""}
              onChangeText={(text) =>
                handleChange(field.key, text)
              }
              placeholder={`Enter ${field.label}`}
              keyboardType={field.numeric ? "numeric" : "default"}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddressForm;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  inputWrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    marginBottom: 6,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    backgroundColor: "#fafafa",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
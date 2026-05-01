import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const categories = ["All", "Electronics", "Clothing", "Shoes"];

const FilterModal = ({ visible, onClose, onApply }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("");

  const handleApply = () => {
    onApply({
      category: selectedCategory,
      sort,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedCategory("All");
    setSort("");
    onApply({ category: "All", sort: "" });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Filters</Text>

          {/* CATEGORY */}
          <Text style={styles.label}>Category</Text>
          <View style={styles.row}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.option,
                  selectedCategory === cat && styles.active,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* SORT */}
          <Text style={styles.label}>Sort by Price</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.option, sort === "low" && styles.active]}
              onPress={() => setSort("low")}
            >
              <Text>Low → High</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.option, sort === "high" && styles.active]}
              onPress={() => setSort("high")}
            >
              <Text>High → Low</Text>
            </TouchableOpacity>
          </View>

          {/* BUTTONS */}
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.reset} onPress={handleReset}>
              <Text>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.apply} onPress={handleApply}>
              <Text style={{ color: "#fff" }}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  option: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  active: {
    backgroundColor: "#ffd814",
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  reset: {
    padding: 10,
  },
  apply: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 8,
  },
});
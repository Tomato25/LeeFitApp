import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const ClientDropdown = ({ users, selectedClient, setSelectedClient, dropdownOpen, setDropdownOpen }) => {
  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setDropdownOpen(!dropdownOpen)}>
        <Text style={styles.dropdownText}>
          {selectedClient ? selectedClient.name : "Select a Client"}
        </Text>
        <Ionicons name={dropdownOpen ? "chevron-up" : "chevron-down"} size={20} color="#ff8c00" />
      </TouchableOpacity>
      {dropdownOpen && (
        <View style={styles.dropdownList}>
          {users.map((user) => (
            <TouchableOpacity
              key={user.id}
              style={styles.dropdownItem}
              onPress={() => {
                setSelectedClient(user);
                setDropdownOpen(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{user.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: { width: "90%", marginBottom: 15 },
  dropdownButton: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    backgroundColor: Colors.light.blue, padding: 12, borderRadius: 10,
  },
  dropdownText: { color: "#ff8c00", fontSize: 16 },
  dropdownList: {
    marginTop: 5, backgroundColor: Colors.light.blue, borderRadius: 10, paddingVertical: 5,
  },
  dropdownItem: {
    padding: 10, borderBottomWidth: 1, borderBottomColor: "#ff8c00",
  },
  dropdownItemText: { color: "#ff8c00", fontSize: 16 },
});

export default ClientDropdown;
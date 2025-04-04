import React from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const WorkoutList = ({ workouts, selectedWeek }) => {
  return (
    <FlatList
      contentContainerStyle={{ marginTop: 10, width: "90%", alignItems: "center" }}
      data={workouts.filter((w) => w.weekStart === selectedWeek?.start)}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.exerciseTitle}</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={{ color: Colors.light.orange }}>Edit</Text>
            <Ionicons name="create-outline" size={20} color="#ff8c00" />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#222", padding: 10, marginVertical: 5,
    borderRadius: 8, width: "100%", flexDirection: "row",
    justifyContent: "space-between", alignItems: "center",
  },
  title: { color: "#fff", fontSize: 16 },
  editBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
});

export default WorkoutList;
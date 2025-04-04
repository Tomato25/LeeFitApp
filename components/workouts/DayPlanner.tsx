import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const DayPlanner = ({
  expandedDays,
  toggleDay,
  selectedExercises,
  setCurrentDay,
  setModalVisible,
  onDelete
}) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  

  return daysOfWeek.map((day, i) => (
    <View key={day} style={styles.dayCard}>
      <TouchableOpacity onPress={() => toggleDay(day)} style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{day}</Text>
        <Ionicons name={expandedDays[day] ? "chevron-up" : "chevron-down"} size={20} color="#ff8c00" />
      </TouchableOpacity>
      {expandedDays[day] && (
          <View style={styles.cardContent}>
            <TouchableOpacity
              onPress={() => { setCurrentDay(day); setModalVisible(true); }}
              style={styles.addButton}
            >
              <Text style={{ color: "#ff8c00" }}>Add Exercise</Text>
            </TouchableOpacity>
            {selectedExercises[day]?.map((ex, index) => (
              <View>
              <Text key={index} style={styles.exerciseItem}>{ex.exerciseTitle}</Text>
              <Text style={styles.exerciseDetails}>
                Sets: {ex.sets}, Reps: {ex.reps}, Weight: {ex.weight}
              </Text>
              <TouchableOpacity
                onPress={() => onDelete(day, ex)}
                style={defaultStyles.btn}
              >
                <Text style={defaultStyles.btnText}>Delete</Text>
              </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        </View>
  ));
};

const styles = StyleSheet.create({
  dayCard: { backgroundColor: Colors.light.blue, padding: 10, borderRadius: 10, marginVertical: 5 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#ff8c00" },
  cardContent: { marginTop: 10 },
  addButton: { padding: 10, backgroundColor: "#222", borderRadius: 5, alignItems: "center" },
  exerciseItem: { color: Colors.light.orange, paddingTop: 5 },
});
export default DayPlanner;
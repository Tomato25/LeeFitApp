import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

const ExerciseModal = ({ visible, exercises, onSelect, onClose, currentDay }) => {
  const [expandedExercise, setExpandedExercise] = useState(null); // To track which card is expanded
  const [exerciseData, setExerciseData] = useState({}); // To store sets, reps, and weight data
  const [addedExercisesPerDay, setAddedExercisesPerDay] = useState({});
  // Handle expansion of exercise card
  const toggleExerciseExpand = (exerciseId) => {
    setExpandedExercise(prev => (prev === exerciseId ? null : exerciseId)); // Toggle expand state
  };

  // Handle the input change for sets, reps, and weight
  const handleInputChange = (exerciseId, field, value) => {
    setExerciseData((prev) => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        [field]: value,
      },
    }));
  };

  const setsRef = useRef(null);
  const repsRef = useRef(null);
  const weightRef = useRef(null);

  const handleFocusNext = (nextRef) => {
    if (nextRef && nextRef.current) {
      nextRef.current.focus();
    }
  };

  // Handle adding exercise to the parent component
  const handleAddExercise = (exercise) => {
    const data = exerciseData[exercise.id];
    if (data && data.sets && data.reps && data.weight) {
      // Call parent onSelect function with the exercise and its data
      onSelect(currentDay, { ...exercise, ...data });
      
      setAddedExercisesPerDay((prev) => {
        const updatedExercises = { ...prev };
        if (!updatedExercises[currentDay]) {
          updatedExercises[currentDay] = new Set();
        }
        updatedExercises[currentDay].add(exercise.id); // Add exercise to the current day's set
        return updatedExercises;
      });

      setExerciseData((prev) => ({ ...prev, [exercise.id]: {} })); // Clear the input data for this exercise
      setExpandedExercise(null); // Collapse the card
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select an Exercise</Text>
          <ScrollView>
            {exercises.map((exercise) => (
              <View key={exercise.id} style={styles.exerciseCard}>
                <TouchableOpacity onPress={() => toggleExerciseExpand(exercise.id)}>
                  <Text style={styles.exerciseTitle}>{exercise.exerciseTitle}
                  {addedExercisesPerDay[currentDay]?.has(exercise.id) && (
                      <MaterialIcons name="check-circle" size={20} color={Colors.light.green} style={styles.checkIcon} />
                    )}
                  </Text>
                </TouchableOpacity>

                {expandedExercise === exercise.id && (
                  <View style={styles.expandableContent}>
                    <View style={styles.inputRow}>
                      <View style={styles.inputContainer}>
                        <TextInput
                          ref={setsRef}
                          style={styles.input}
                          placeholder="Sets"
                          keyboardType="numeric"
                          value={exerciseData[exercise.id]?.sets || ''}
                          onChangeText={(value) => handleInputChange(exercise.id, 'sets', value)}
                          onSubmitEditing={() => handleFocusNext(repsRef)} // Move to next input (Reps)
                          returnKeyType="next"
                        />
                        <Text style={styles.inputLabel}>Sets</Text>
                      </View>

                      <View style={styles.inputContainer}>
                        <TextInput
                          ref={repsRef}
                          style={styles.input}
                          placeholder="Reps"
                          keyboardType="numeric"
                          value={exerciseData[exercise.id]?.reps || ''}
                          onChangeText={(value) => handleInputChange(exercise.id, 'reps', value)}
                          onSubmitEditing={() => handleFocusNext(weightRef)} // Move to next input (Weight)
                          returnKeyType="next"
                        />
                        <Text style={styles.inputLabel}>Reps</Text>
                      </View>

                      <View style={styles.inputContainer}>
                        <TextInput
                          ref={weightRef}
                          style={styles.input}
                          placeholder="Weight"
                          keyboardType="numeric"
                          value={exerciseData[exercise.id]?.weight || ''}
                          onChangeText={(value) => handleInputChange(exercise.id, 'weight', value)}
                          onSubmitEditing={() => handleAddExercise(exercise)} // Trigger add on completion
                          returnKeyType="done"
                        />
                        <Text style={styles.inputLabel}>Weight</Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => handleAddExercise(exercise)}
                    >
                      <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    backgroundColor: Colors.light.blue,
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "70%",
  },
  modalTitle: {
    color: Colors.light.orange,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  exerciseCard: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: Colors.light.blue,
    borderRadius: 8,
  },
  exerciseTitle: {
    color: Colors.light.orange,
    fontSize: 16,
    fontWeight: "bold",
  },
  expandableContent: {
    marginTop: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  input: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    fontSize: 14,
    width: "100%",
  },
  inputLabel: {
    color: Colors.light.orange,
    fontSize: 12,
    marginTop: 5,
  },
  addButton: {
    backgroundColor: "#ff8c00",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#ff8c00",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ExerciseModal;

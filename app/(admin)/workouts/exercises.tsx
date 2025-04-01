import { View, Text, StyleSheet, TouchableOpacity,FlatList, SafeAreaView, Modal, TextInput, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { defaultStyles } from "@/constants/Styles";
import BookingTime from "@/components/BookingTIme";
import Picker from "@/components/Picker";
import Colors from "@/constants/Colors";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { db } from "@/firebaseConfig";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [loading, setLoading] = useState(true);


  // Fetch workouts from Firestore
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "exercises"));
        const workoutsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setWorkouts(workoutsData); // Store fetched workouts in state
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }  finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
    console.log(workouts)
  }, []);

  const openEditModal = (exercise) => {
    setSelectedExercise(exercise);
    setEditedTitle(exercise.exerciseTitle);
    setModalVisible(true);
  };

  const saveChanges = async () => {
    if (selectedExercise) {
      try {
        const exerciseRef = doc(db, "exercises", selectedExercise.id);
        await updateDoc(exerciseRef, {
          exerciseTitle: editedTitle,
        });
        setWorkouts((prev) => prev.map((ex) => (ex.id === selectedExercise.id ? { ...ex, exerciseTitle: editedTitle } : ex)));
        setModalVisible(false);
      } catch (error) {
        console.error("Error updating exercise:", error);
      }
    }
  };

  

  return (
    <View style={defaultStyles.container}>
      <LinearGradient colors={["#10123B", "#000000"]} style={defaultStyles.background}>
        <SafeAreaView style={styles.container}>
        
        {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={Colors.light.orange} />
              <Text style={styles.loaderText}>Loading exercises...</Text>
            </View>
          )  : ( 
          <FlatList
            contentContainerStyle={{ marginTop: 10, width: "90%", alignItems: "center" }}
            data={workouts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.exerciseCard}>
                {/* Exercise Title */}
                <Text style={styles.exerciseTitle}>{item.exerciseTitle}</Text>
            
                {/* Tags Display */}
                <View style={styles.tagContainer}>
                  {item.tags?.map((tag, index) => (
                    <View key={index}>
                      <View style={[styles.tagButton]}>
                        <Text style={[styles.textBtn]}>{tag.tag}</Text>
                      </View>
                    </View>
                  ))}
                </View>
            
                {/* Add Button */}
                <TouchableOpacity style={styles.addButton} onPress={() => openEditModal(item)}>
                  <Text style={{ color: "#ff8c00" }}>Edit</Text>
                  <Ionicons name="create-outline" size={20} color="#ff8c00" />
                </TouchableOpacity>
              </View>

            )}
          /> )}
        </SafeAreaView>
        <TouchableOpacity onPress={() => router.push('./addExercise')} style={defaultStyles.btn}>
          <Text style={defaultStyles.btnText}>Add new exercise</Text>
          </TouchableOpacity>     
          </LinearGradient>


      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Exercise</Text>
            <TextInput
              style={styles.input}
              value={editedTitle}
              onChangeText={setEditedTitle}
              placeholder="Exercise Title"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                <Text style={{ color: "white" }}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={{ color: "white" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
    flex: 1,
  },
  dateContainer: {
    padding: 5,
    paddingHorizontal: 15,
    backgroundColor: "#ff8c00",
    borderRadius: 15,
  },
  dateText: {
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
  },
  exerciseCard: {
    borderRadius: 15,
    backgroundColor: Colors.light.blue,
    width: "100%",
    paddingHorizontal: 15,
    padding: 10,
    marginBottom: 10,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  exerciseTitle: {
    color: "#ff8c00",
    fontSize: 16,
    fontWeight: "bold",
  },
  dotSeparator: {
    height: 6,
    width: 6,
    borderRadius: 99,
    backgroundColor: "#ff8c00",
  },
  exerciseTags: {
    color: "#0096FF",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginLeft: "auto",
  },
   tagContainer: {
      width: "80%",
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    tagButton: {
      borderWidth: 1,
      borderRadius: 99,
      padding: 5,
      paddingHorizontal: 20,
      alignItems: "center",
      marginRight: 10,
      borderColor: "#ff8c00",
      marginBottom: 15,
    },
    textBtn: {
      color: Colors.light.orange,
      fontFamily: "outfit",
    },
    editButton: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, width: "80%", alignItems: "center" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { width: "100%", padding: 10, borderWidth: 1, borderColor: "gray", borderRadius: 5, marginBottom: 10 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  saveButton: { backgroundColor: "#ff8c00", padding: 10, borderRadius: 5, flex: 1, alignItems: "center", marginRight: 5 },
  cancelButton: { backgroundColor: "gray", padding: 10, borderRadius: 5, flex: 1, alignItems: "center" },
});

export default Workouts;

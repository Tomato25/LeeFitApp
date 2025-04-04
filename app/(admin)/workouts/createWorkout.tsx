  import {
    View, SafeAreaView, ActivityIndicator, ScrollView,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { LinearGradient } from "expo-linear-gradient";
  import { defaultStyles } from "@/constants/Styles";
  import { collection, getDocs, addDoc, updateDoc, doc, query, where } from "firebase/firestore";
  import { db } from "@/firebaseConfig";
  import ClientDropdown from "../../../components/workouts/ClientDropdown";
  import WeekSelector from "../../../components/workouts/WeekSelector";
  import WorkoutList from "../../../components/workouts/WorkoutList";
  import DayPlanner from "../../../components/workouts/DayPlanner";
  import ExerciseModal from "../../../components/workouts/ExerciseModal";
  import SaveWorkoutButton from "../../../components/workouts/SaveWorkoutButton";

  const Workouts = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [weeks, setWeeks] = useState([]);
    const [workoutWeeks, setWorkoutWeeks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [expandedDays, setExpandedDays] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState({});
    const [currentDay, setCurrentDay] = useState(null);

    
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          const usersData = [];
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (userData.role === "user") {
              usersData.push({
                id: doc.id,
                name: `${userData.firstName} ${userData.lastName}`,
              });
            }
          });
          setUsers(usersData);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchUsers();
    }, []);

    const getCurrentWeek = () => {
      const currentDate = new Date();
      // Calculate the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const dayOfWeek = currentDate.getDay();
      const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Get the Monday of the current week

      const startDate = new Date(currentDate.setDate(diff)); // Start of the week (Monday)
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); // End of the week (Sunday)

      return { start: startDate.toISOString().split("T")[0], end: endDate.toISOString().split("T")[0] };
    };

    useEffect(() => {
      // Generate weeks for the last 4 and next 4 weeks (always starting on Monday)
      const generateWeeks = () => {
        let weekArray = [];
        const currentDate = new Date();
        for (let i = -4; i <= 4; i++) {
          let startDate = new Date(currentDate);
          const dayOfWeek = startDate.getDay();
          const diff = startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Get the Monday of the current week
          startDate.setDate(diff + i * 7);
          
          let endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + 6); // End of the week (Sunday)
          
          weekArray.push({
            start: startDate.toISOString().split("T")[0],
            end: endDate.toISOString().split("T")[0],
          });
        }
        setWeeks(weekArray);

        // Set the default selected week to the current week
        const currentWeek = getCurrentWeek();
        setSelectedWeek(currentWeek); // Default to current week
      };

      generateWeeks();
    }, []);


    useEffect(() => {
      const fetchWorkouts = async () => {
        if (!selectedClient) return;
        try {
          const querySnapshot = await getDocs(collection(db, "workouts"));
          const workoutsData = querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((w) => w.userId === selectedClient.id && w.weekStart === selectedWeek.start);
            
          if (workoutsData.length > 0) {
            const workout = workoutsData[0]; // Assume one workout per user per week
            setSelectedExercises(workout.exercises); // Assuming exercises are stored as an object with days as keys
          }
        } catch (error) {
          console.error("Error fetching workouts:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchWorkouts();
    }, [selectedClient, selectedWeek]);

    useEffect(() => {
      const fetchExercises = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "exercises"));
          const exercisesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setExercises(exercisesData);
        } catch (error) {
          console.error("Error fetching exercises:", error);
        }
      };
      fetchExercises();
    }, []);

    useEffect(() => {
      // Reset selected exercises when changing client
      setSelectedExercises({});
      setExpandedDays({});
    }, [selectedClient]);

    useEffect(() => {
      // Reset selected exercises when changing week
      setSelectedExercises({});
      setExpandedDays({});
    }, [selectedWeek]);

    const toggleDay = (day) => {
      setExpandedDays((prev) => ({ ...prev, [day]: !prev[day] }));
    };

    const addExerciseToDay = (day, exercise) => {
      setSelectedExercises((prev) => {
        const updatedDayExercises = prev[day] ? [...prev[day], exercise] : [exercise];
        return { ...prev, [day]: updatedDayExercises };
      });
    };

    const saveWorkout = async () => {
      if (!selectedClient || !selectedWeek) {
        alert("Client or week is missing.");
        return;
      }
    
      // Prepare exercises with sets, reps, and weight
      const exercisesWithDetails = Object.keys(selectedExercises).reduce((acc, day) => {
        acc[day] = selectedExercises[day].map((exercise) => ({
          ...exercise,
          sets: exercise.sets || 0, // Default to 0 if not provided
          reps: exercise.reps || 0, // Default to 0 if not provided
          weight: exercise.weight || 0, // Default to 0 if not provided
        }));
        return acc;
      }, {});
    
      // Fetch existing workout to check if it exists for the selected user and week
      const workoutQuery = query(
        collection(db, "workouts"),
        where("userId", "==", selectedClient.id),
        where("weekStart", "==", selectedWeek.start)
      );
    
      try {
        const querySnapshot = await getDocs(workoutQuery);
        if (!querySnapshot.empty) {
          // Workout exists, so update it
          const workoutDocId = querySnapshot.docs[0].id;
          const workoutDocRef = doc(db, "workouts", workoutDocId);
    
          // Update the workout document with sets, reps, and weight for exercises
          await updateDoc(workoutDocRef, {
            exercises: exercisesWithDetails, // Updated exercises with sets, reps, and weight
          });
          alert("Workout updated successfully!");
        } else {
          // Workout doesn't exist, so create a new one
          await addDoc(collection(db, "workouts"), {
            userId: selectedClient.id,
            weekStart: selectedWeek.start,
            exercises: exercisesWithDetails, // Save the exercises with sets, reps, and weight
          });
          alert("Workout saved successfully!");
        }
      } catch (error) {
        console.error("Error saving workout:", error);
        alert("Failed to save workout.");
      }
    };

    useEffect(() => {
      const fetchWorkouts = async () => {
        if (!selectedClient) return;
        try {
          const querySnapshot = await getDocs(collection(db, "workouts"));
          const workoutsData = querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((w) => w.userId === selectedClient.id);
          setWorkouts(workoutsData);
          setWorkoutWeeks(workoutsData.map((w) => w.weekStart));
        } catch (error) {
          console.error("Error fetching workouts:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchWorkouts();
    }, [selectedClient]);

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const deleteExerciseFromDay = async (day, exerciseToDelete) => {
      // Remove exercise from the selectedExercises state
      setSelectedExercises((prev) => {
        const updatedDayExercises = prev[day]?.filter(
          (exercise) => exercise.id !== exerciseToDelete.id
        );
        return { ...prev, [day]: updatedDayExercises };
      });
    
      // Update Firebase to remove the exercise
      if (selectedClient && selectedWeek) {
        try {
          // Fetch the workout for the selected client and week
          const workoutQuery = query(
            collection(db, "workouts"),
            where("userId", "==", selectedClient.id),
            where("weekStart", "==", selectedWeek.start)
          );
          
          const querySnapshot = await getDocs(workoutQuery);
          if (!querySnapshot.empty) {
            const workoutDocId = querySnapshot.docs[0].id;
            const workoutDocRef = doc(db, "workouts", workoutDocId);
    
            // Get the current exercises data from the workout document
            const workoutDoc = querySnapshot.docs[0].data();
            const updatedExercises = { ...workoutDoc.exercises };
            
            // Remove the exercise from the specific day
            const updatedDayExercises = updatedExercises[day]?.filter(
              (exercise) => exercise.id !== exerciseToDelete.id
            );
    
            // Update the workout document in Firebase
            await updateDoc(workoutDocRef, {
              exercises: {
                ...updatedExercises,
                [day]: updatedDayExercises,
              },
            });
    
            alert("Exercise deleted successfully!");
          }
        } catch (error) {
          console.error("Error deleting exercise from Firebase:", error);
          alert("Failed to delete exercise.");
        }
      }
    };

    return (
      <View style={defaultStyles.container}>
        <LinearGradient colors={["#10123B", "#000000"]} style={defaultStyles.background}>
          <SafeAreaView style={{ flex: 1, alignItems: "center", width: "100%" }}>
            <ClientDropdown
              users={users}
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
            />
            <WeekSelector
              weeks={weeks}
              selectedWeek={selectedWeek}
              setSelectedWeek={setSelectedWeek}
              workoutWeeks={workoutWeeks}
            />
          
            {selectedWeek && (
              <ScrollView style={{ width: "90%" }}>
                <DayPlanner
                  expandedDays={expandedDays}
                  toggleDay={toggleDay}
                  selectedExercises={selectedExercises}
                  setCurrentDay={setCurrentDay}
                  setModalVisible={setModalVisible}
                  onDelete={deleteExerciseFromDay}
                />
                <SaveWorkoutButton onPress={saveWorkout} />
              </ScrollView>
            )}
            <ExerciseModal
              visible={modalVisible}
              exercises={exercises}
              currentDay={currentDay}
              onSelect={addExerciseToDay}
              onClose={() => setModalVisible(false)}
            />
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  };

  export default Workouts;
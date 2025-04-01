import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [workoutWeeks, setWorkoutWeeks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  useEffect(() => {
    const generateWeeks = () => {
      let weekArray = [];
      const currentDate = new Date();
      for (let i = -4; i <= 4; i++) {
        let startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() + i * 7);
        let endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        weekArray.push({
          start: startDate.toISOString().split("T")[0],
          end: endDate.toISOString().split("T")[0],
        });
      }
      setWeeks(weekArray);
      setSelectedWeek(weekArray[4]);
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

  return (
    <View style={defaultStyles.container}>
      <LinearGradient colors={["#10123B", "#000000"]} style={defaultStyles.background}>
        <SafeAreaView style={styles.container}>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setDropdownOpen(!dropdownOpen)}
            >
              <Text style={styles.dropdownText}>
                {selectedClient ? selectedClient.name : "Select a Client"}
              </Text>
              <Ionicons
                name={dropdownOpen ? "chevron-up" : "chevron-down"}
                size={20}
                color="#ff8c00"
              />
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

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10 }}
            data={weeks}
            keyExtractor={(item) => item.start}
            renderItem={({ item }) => {
              const isChosen = item.start === selectedWeek?.start;
              const isWorkoutSet = workoutWeeks.includes(item.start);
              return (
                <TouchableOpacity
                  onPress={() => setSelectedWeek(item)}
                  style={[styles.dayButton, isChosen && { backgroundColor: "#ff8c00" }]}
                >
                  <Text style={isChosen ? styles.chosenTextBtn : styles.textBtn}>
                    {item.start} - {item.end} {isWorkoutSet ? "✔" : "✖"}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          {loading ? (
            <ActivityIndicator size="large" color="#ff8c00" style={{ marginTop: 20 }} />
          ) : (
            <FlatList
              contentContainerStyle={{ marginTop: 10, width: "90%", alignItems: "center" }}
              data={workouts.filter((w) => w.weekStart === selectedWeek?.start)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.exerciseCard}>
                  <Text style={styles.exerciseTitle}>{item.exerciseTitle}</Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={{ color: "#ff8c00" }}>Edit</Text>
                    <Ionicons name="create-outline" size={20} color="#ff8c00" />
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  dropdownContainer: {
    width: "90%",
    marginBottom: 15,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.light.blue,
    padding: 12,
    borderRadius: 10,
  },
  dropdownText: {
    color: "#ff8c00",
    fontSize: 16,
  },
  dropdownList: {
    marginTop: 5,
    backgroundColor: Colors.light.blue,
    borderRadius: 10,
    paddingVertical: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ff8c00",
  },
  dropdownItemText: {
    color: "#ff8c00",
    fontSize: 16,
  },
  textBtn: {
           color:  Colors.light.orange,
           fontFamily: "outfit"
      },
      chosenTextBtn: {
          color: "black",
          fontFamily: "outfit"
      },
});

export default Workouts;

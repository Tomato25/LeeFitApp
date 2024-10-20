import { View, Text, StyleSheet, TouchableOpacity,FlatList } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { defaultStyles } from "@/constants/Styles";
import BookingTime from "@/components/BookingTIme";
import Picker from "@/components/Picker";
import Colors from "@/constants/Colors";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const workouts = () => {
  return (
    <View style={defaultStyles.container}>
      <LinearGradient
        colors={["#10123B", "#000000"]}
        style={[defaultStyles.background, { justifyContent: "space-between" }]}
      >
        <FlatList
          contentContainerStyle={{
            marginTop: 10,
            width: "90%",
            alignItems: "center",
          }}
          data={workouts}
          horizontal={false}
          renderItem={({ item }) => (
            <View style={styles.workoutContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              ></View>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.push("./addExercise")}
        >
          <Text style={defaultStyles.btnText}>Create exercise</Text>
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={Colors.light.blue}
          />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitleText: {
    color: Colors.light.orange,
    fontFamily: "outfit-sb",
    fontSize: 20,
  },
  cardImg: {
    height: 150,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  card: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: Colors.light.blue,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    paddingBottom: 15,
  },
  btn: {
    backgroundColor: Colors.light.orange,
    height: 50,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    gap: 6,
    paddingHorizontal: 20,
    marginBottom: 15
  },
  workoutContainer: {
    borderRadius: 15,
    backgroundColor: Colors.light.blue,
    width: '100%',
    paddingHorizontal: 15,
    padding: 10,
    marginBottom: 10,
  },
});
export default workouts;

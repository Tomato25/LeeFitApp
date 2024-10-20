import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { defaultStyles } from "@/constants/Styles";
import BookingTime from "@/components/BookingTIme";
import Picker from "@/components/Picker";
import Colors from "@/constants/Colors";
import { Image } from "expo-image";
import { router } from "expo-router";

const workouts = () => {
  return (
    <View style={defaultStyles.container}>
      <LinearGradient
        colors={["#10123B", "#000000"]}
        style={[defaultStyles.background, { justifyContent:"space-around" }]}
        >
        <TouchableOpacity style={styles.card} onPress={() => router.push('./createWorkout')}>
          <Image
            style={styles.cardImg}
            source={require("../../../assets/images/exercise1.jpg")}
          />
          <Text style={styles.subtitleText}>Create workout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => router.push('./exercises')}>
          <Image
            style={styles.cardImg}
            source={require("../../../assets/images/exercise2.jpg")}
          />
          <Text style={styles.subtitleText}>Exercises</Text>
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
});
export default workouts;

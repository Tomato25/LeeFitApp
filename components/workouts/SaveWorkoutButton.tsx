import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { defaultStyles } from "@/constants/Styles";

const SaveWorkoutButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={defaultStyles.btn}>
    <Text style={defaultStyles.btnText}>Save Workout</Text>
  </TouchableOpacity>
);

export default SaveWorkoutButton;
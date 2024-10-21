import React from "react";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";

const WorkoutsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="workoutIndex"
        options={{
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "outfit-sb",
          },
          headerStyle: {
            backgroundColor: "#10123B",
          },
          headerTintColor: Colors.light.orange,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerTitle: "Workouts",
        }}
      />
      <Stack.Screen
        name="createWorkout"
        options={{
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "outfit-sb",
          },
          headerStyle: {
            backgroundColor: "#10123B",
          },
          headerTintColor: Colors.light.orange,
          headerTitleAlign: "center",
          headerBackVisible: true,
          headerTitle: "Create workout",
        }}
      />
      <Stack.Screen
        name="exercises"
        options={{
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "outfit-sb",
          },
          headerStyle: {
            backgroundColor: "#10123B",
          },
          headerTintColor: Colors.light.orange,
          headerTitleAlign: "center",
          headerBackVisible: true,
          headerTitle: "Exercises",
        }}
      />
      <Stack.Screen
        name="addExercise"
        options={{
          presentation: "modal",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "outfit-sb",
          },
          headerStyle: {
            backgroundColor: "#10123B",
          },
          headerTintColor: Colors.light.orange,

          headerTitleAlign: "center",
          headerBackVisible: true,
          headerTitle: "Create exercise",
        }}
      />
    </Stack>
  );
};

export default WorkoutsLayout;

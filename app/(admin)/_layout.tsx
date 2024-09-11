import Colors from "@/constants/Colors";
import { Tabs,Stack } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "outfit-sb",
          },
          headerStyle: {
            backgroundColor: "#10123B",
            
            
          },
          headerTintColor: Colors.light.orange,
          headerTitleAlign: "center",
        tabBarActiveTintColor: Colors.light.orange,
        tabBarLabelStyle: {
          fontFamily: "outfit-sb", 
          paddingBottom:10,
          fontSize:11    
        },
        tabBarInactiveTintColor: "rgba(255, 139, 0, 0.5)",
        
        tabBarStyle: {
          backgroundColor: "#000000",
          height: 60,
          paddingTop: 10,
          borderTopWidth: 0
        }

      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      ></Tabs.Screen>
      
       <Tabs.Screen
        name="booking"
        options={{
          title: "Book",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      ></Tabs.Screen>
       <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      ></Tabs.Screen>
       <Tabs.Screen
        name="workouts"
        options={{
          title: "Workouts",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="dumbbell" size={size} color={color} />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}


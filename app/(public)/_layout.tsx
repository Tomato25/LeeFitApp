import React from 'react';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';

const PublicLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: "Log in or sign up",
          headerShadowVisible: false,
          headerTitleStyle: {          },
          headerStyle: {
            backgroundColor: "#10123B",
            
            
          },
          headerTintColor: Colors.light.orange,
          headerTitleAlign: "center",
          headerBackVisible: false
                }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Sign up",
          headerShadowVisible: false,
          headerTitleStyle: {
          },
          headerStyle: {
            backgroundColor: "#10123B",
            
            
          },
          headerTintColor: Colors.light.orange,
          headerTitleAlign: "center",
          headerBackVisible: false
                }}></Stack.Screen>
      <Stack.Screen
        name="reset"
        options={{
          title: "Reset password",
          headerShadowVisible: false,
          headerTitleStyle: {
          },
          headerStyle: {
            backgroundColor: "#10123B",
            
            
          },
          headerTintColor: Colors.light.orange,
          headerTitleAlign: "center",
          headerBackVisible: false
                }}></Stack.Screen>
    </Stack>
  );
};

export default PublicLayout;
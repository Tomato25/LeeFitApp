// ios 569567459271-toia0bp9fket0rbkdv63kdkbfbd3qmai.apps.googleusercontent.com
// android  569567459271-8do11b0hmooc2gl9v09li1958d0gks6p.apps.googleusercontent.com
import { auth } from "@/firebaseConfig";
import { useUserStore } from "@/store/sessionStore";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { router, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { RootSiblingParent } from 'react-native-root-siblings';


// Prevent the splash screen from auto-hiding before asset loading is complete.
export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();  


export default function RootLayout() {

  

  const segments = useSegments();
  const router = useRouter();
  const user = auth.currentUser;

  const [loaded, error] = useFonts({
    "outfit": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-b": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-sb": require("../assets/fonts/Outfit-SemiBold.ttf"),
  });



  useEffect(() => {
    if (error) throw error;
  }, [error]);
    
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const {userInfo,setUserInfo} = useUserStore((state) => ({
    userInfo: state.userInfo,
    setUserInfo: state.setUserInfo
  })
  )


  useEffect(() => {
   
    const inTabsGroup = segments[0] === "(tabs)";

    if (user && !inTabsGroup && (userInfo.role === "user")) {
      router.replace("/(tabs)/");      
    } else if (user && !inTabsGroup && (userInfo.role === "admin")) {
      router.replace("/(admin)/");      
    } else if (!user) {
      router.replace("/(public)/login");
    }
  }, [user]);



  return (
    <RootSiblingParent>
    <Stack>
      <Stack.Screen name="(public)"  options={{ headerShown: false, }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />
    </Stack>
    </RootSiblingParent>
  );
}

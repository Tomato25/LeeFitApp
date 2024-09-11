import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { defaultStyles } from '@/constants/Styles'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '@/constants/Colors'
import { Image } from "expo-image";
import { signOut } from 'firebase/auth'
import { router } from 'expo-router'
import { auth } from '@/firebaseConfig'
import {useUserStore} from "@/store/sessionStore"

const profile = () => {

  const clearUserInfo = useUserStore((state) => state.clearUserInfo)

  const onSignOut = () => {
    signOut(auth);
    clearUserInfo();
    router.replace("/(public)/login")
  }


  return (
    <View style={defaultStyles.container}>
    <LinearGradient
      colors={["#10123B", "#000000"]}
      style={[defaultStyles.background, { justifyContent:"space-between" }]}
    >
    <View style={{ gap:30}}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          marginTop: 30,
        }}
      >
        <View style={styles.profileImgContainer}>
          <Image
            style={styles.profileImg}
            source={require("../../assets/images/profileImg.jpg")}
          />
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={defaultStyles.btnOutlineText}>
            Change profile picture
          </Text>
          <Ionicons
            name="camera-outline"
            size={24}
            color={Colors.light.orange}
          />
        </TouchableOpacity>
      </View>

      <View style={defaultStyles.card}>
        <View style={styles.subtitle}>
          <Text style={styles.subtitleText}>Personal Information</Text>
          <TouchableOpacity>
          <Ionicons
            name="create-outline"
            size={24}
            color={Colors.light.orange}
          />
          </TouchableOpacity>
        </View>

        <View style={styles.subtitle}>
          <Text style={defaultStyles.btnOutlineText}>Name</Text>
          <Text style={styles.valueText}>Stevan</Text>
        </View>
        <View style={styles.subtitle}>
          <Text style={defaultStyles.btnOutlineText}>Last name</Text>
          <Text style={styles.valueText}>Stevanovski</Text>
        </View>
        <View style={styles.subtitle}>
          <Text style={defaultStyles.btnOutlineText}>Age</Text>
          <Text style={styles.valueText}>24</Text>
        </View>
      </View>

      <View style={defaultStyles.card}>
        <View style={styles.subtitle}>
          <Text style={styles.subtitleText}>Membership package</Text>
          <TouchableOpacity>
          <Ionicons
            name="create-outline"
            size={24}
            color={Colors.light.orange}
          />
          </TouchableOpacity>
        </View>
        <View style={styles.subtitle}>
          <Text style={defaultStyles.btnOutlineText}>M package</Text>
          <Text style={styles.valueText}>32 days left</Text>
        </View>
      </View>
      </View>
      <TouchableOpacity
        style={[defaultStyles.btn, {marginBottom:20}]}
        onPress={onSignOut}
      >
        <Text style={defaultStyles.btnText}>Log out</Text>
      </TouchableOpacity>
    </LinearGradient>
  </View>
  )
}

const styles = StyleSheet.create({
  profileImgContainer: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  profileImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  subtitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  subtitleText: {
    color: Colors.light.orange,
    fontFamily: "outfit-sb",
    fontSize: 20,
  },
  btn: {
    borderColor: Colors.light.orange,
    borderWidth: 1,
    height: 40,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  valueText: {
    color: Colors.light.lightblue,
        fontSize: 16,
        fontFamily: "outfit",
  }

});

export default profile
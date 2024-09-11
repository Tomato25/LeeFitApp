import { View, Text, Button, Pressable, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { auth } from '@/firebaseConfig'
import { signOut } from 'firebase/auth'
import { Link, router } from 'expo-router'
import { db } from '@/firebaseConfig'
import { addDoc, collection } from '@firebase/firestore'
import { LinearGradient } from 'expo-linear-gradient'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Image } from "expo-image";
import { SafeAreaView } from 'react-native-safe-area-context'
import WeekTracker from '@/components/weekTracker'
import { useUserStore } from '@/store/sessionStore'


const index = () => {

  const user = auth.currentUser;

  const onSignOut = () => {
    signOut(auth);
    router.replace("/(public)/login")
  }

  const {userInfo,setUserInfo} = useUserStore((state) => ({
    userInfo: state.userInfo,
    setUserInfo: state.setUserInfo
  })
  )

  
  return (
    <View style={defaultStyles.container}>
    <LinearGradient
      colors={["#10123B", "#000000"]}
      style={[defaultStyles.background, { paddingTop:60 }]}
    >
      <View style={styles.row}>
        <Text style={styles.nameText}>Hi Stevo!</Text>
        <View style={styles.profileImgContainer}>
          <Link href="/(tabs)/profile">
            <Image
              style={styles.profileImg}
              source={require("../../assets/images/profileImg.jpg")}
            />
          </Link>
        </View>
      </View>
      <WeekTracker />
      <View>
        <Text>Next workoust</Text>
      </View>
      <View>
        <Text>Metrics</Text>
      </View>
      <View>
        <Text>Prevoius session</Text>
      </View>
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>{userInfo.role}</Text>
      </TouchableOpacity>

    </LinearGradient>
  </View>
  )
}

const styles = StyleSheet.create({
  profileImgContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  profileImg: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  nameText: {
    color: Colors.light.orange,
    fontFamily: "outfit-sb",
    fontSize: 20,
    alignSelf: "flex-start",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
});

export default index
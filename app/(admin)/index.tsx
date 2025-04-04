import { View, Text, Button, Pressable, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '@/firebaseConfig'
import { signOut } from 'firebase/auth'
import { Link, router } from 'expo-router'
import { db } from '@/firebaseConfig'
import { addDoc, collection } from '@firebase/firestore'
import { LinearGradient } from 'expo-linear-gradient'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Image } from "expo-image";
import WeekTracker from '@/components/weekTracker'
import { useUserStore } from '@/store/sessionStore'

import { getUsersWithMissingWeeks } from "@/utils/getMissingWorkouts"; // adjust path if needed


const index = () => {

  
  const [missingData, setMissingData] = useState([]);
  const [loading, setLoading] = useState(true);
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



  useEffect(() => {
    const fetchMissingWorkouts = async () => {
      try {
        const data = await getUsersWithMissingWeeks();
        setMissingData(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching missing workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMissingWorkouts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: item.profileImg }}
          style={styles.profileImg}
          resizeMode="cover"
        />
        
        <Text style={styles.userName}>
          {item.firstName} {item.lastName}
        </Text>
      </View>
      <Text style={styles.weekText}>{item.missingWeeks}</Text>
    </View>
  );

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (missingData.length === 0) {
    return <Text style={styles.emptyText}>All users have workouts!</Text>;
  }


  
  return (
    <View style={defaultStyles.container}>
    <LinearGradient
      colors={["#10123B", "#000000"]}
      style={[defaultStyles.background, { paddingTop: 60 }]}
    >
      <View style={styles.subtitle}>
        <Text style={styles.nameText}>Hi Lauren!</Text>
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
      <View style={styles.subtitle}>
        <Text style={styles.nameText}>Pending workouts</Text>
      </View>
      <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.headerText, styles.flexLeft]}>User</Text>
        <Text style={[styles.headerText, styles.flexRight]}>Missing Week</Text>
      </View>
      <FlatList
        data={missingData}
        keyExtractor={(item) => item.userId}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
      <View>
        <Text>Metrics</Text>
      </View>
      <View>
        <Text>Prevoius session</Text>
      </View>
 
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
  subtitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    
  },container: {
    padding: 16,
    width: "100%",
    flex: 1,
  },
  listContainer: {
    paddingBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.light.blue,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    color: Colors.light.orange,
    fontSize: 16,
  },
  flexLeft: {
    flex: 1,
  },
  flexRight: {
    flex: 1,
    textAlign: "right",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    
  },

  userName: {
    color: Colors.light.orange,
    fontSize: 14,
  },
  weekText: {
    color: Colors.light.orange,
    fontSize: 14,
    flex: 1,
    textAlign: "right",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    color: Colors.light.orange,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: Colors.light.orange,
  },
});

export default index
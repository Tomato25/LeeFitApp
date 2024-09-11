import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from "expo-image";
import { Ionicons } from '@expo/vector-icons';

const about = () => {
  return (
    <View style={defaultStyles.container}>
      <LinearGradient
        colors={["#10123B", "#000000"]}
        style={[defaultStyles.background, { gap: 30 }]}
      >
        <View style={styles.profileImgContainer}>
          <Image
            style={styles.profileImg}
            source={require("../../assets/images/LaureenProfile.jpg")}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.valueText}>
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y
            archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar
            de las industrias desde el año 1500, cuando un impresor
          </Text>
          <Text style={styles.valueText}>
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y
            archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar
            de las industrias desde el año 1500, cuando un impresor
          </Text>
          <Text style={styles.valueText}>
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y
            archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar
            de las industrias desde el año 1500, cuando un impresor
          </Text>
        </View>
        <View style={styles.addressContainer}>
          <Ionicons name="location-sharp" size={24} color={Colors.light.orange}/>
            <Text style={styles.valueText}>Down Under</Text>
            <Text style={styles.valueText}>235, 04403</Text>
            <Text style={styles.valueText}>Sydney</Text>
          </View>
          <View style={{flexDirection: "row", justifyContent:"space-between", gap:50}}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Whatsapp</Text>
              <Ionicons name="logo-whatsapp" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Email</Text>
              <Ionicons name="mail-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  profileImgContainer: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  profileImg: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  valueText: {
    color: Colors.light.lightblue,
    fontSize: 16,
    fontFamily: "outfit",
  },
  title: {
    color: Colors.light.orange,
    fontFamily: "outfit-sb",
    fontSize: 26
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "90%",
    gap: 10
  },
  addressContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  btn:{
    backgroundColor: Colors.light.orange,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    flexDirection: "row", 
    gap: 10
  },
  btnText: {
    color: "black",
    fontSize: 16,
    fontFamily: "outfit-sb",
  }

});

export default about
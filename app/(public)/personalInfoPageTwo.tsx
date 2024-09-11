import {
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function App() {
  const [image, setImage] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={defaultStyles.container}>
      <LinearGradient
        colors={["#10123B", "#000000"]}
        style={defaultStyles.background}
      >
        <ScrollView
          contentContainerStyle={{
            justifyContent: "space-around",
            alignItems: "center",
            width: Dimensions.get("screen").width,
            gap: 30,
            flex: 1,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
              marginTop: 50,
              width: "90%",
            }}
          >
            <TouchableOpacity
              onPress={() => pickImage()}
              style={{
                height: 250,
                width: 250,
                borderWidth: 2,
                borderRadius: 150,
                justifyContent: "center",
                alignItems: "center",
                borderColor: Colors.light.orange,
              }}
            >
              {image ? (
                <Image
                  style={{ flex: 1, width: "100%", borderRadius: 150 }}
                  contentFit="cover"
                  source={{ uri: image }}
                />
              ) : (
                <Ionicons name="camera" size={75} color={Colors.light.orange} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
                backgroundColor: Colors.light.orange,
                width: "60%",
              }}
              onPress={() => pickImage()}
            >
              <Text style={defaultStyles.btnText}>Choose an image</Text>
            </TouchableOpacity>
          </View>
          <View style={defaultStyles.card}>
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
            <View style={styles.subtitle}>
              <Text style={defaultStyles.btnOutlineText}>Weight</Text>
              <Text style={styles.valueText}>75 kg</Text>
            </View>
            <View style={styles.subtitle}>
              <Text style={defaultStyles.btnOutlineText}>Height</Text>
              <Text style={styles.valueText}>180 cm</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                gap: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "40%",
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  borderColor: Colors.light.orange,
                }}
              >
                <Text style={defaultStyles.btnOutlineText}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.replace("/(tabs)")}
                style={{
                  width: "40%",
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  backgroundColor: Colors.light.orange,
              
                }}
              >
                <Text style={defaultStyles.btnText}>Next</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 99,
                  borderWidth: 1,
                }}
              ></View>
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 99,
                  borderWidth: 1,
                  backgroundColor: "black",
                }}
              ></View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
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
  valueText: {
    color: Colors.light.lightblue,
    fontSize: 16,
    fontFamily: "outfit",
  },
});

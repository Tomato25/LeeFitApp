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
import { useRegInfoStore } from "@/store/sessionStore";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from "@/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


export default function App() {
  const [imageUrl, setImageUrl]= useState("")
  const [image, setImage] = useState("");

  const {
    userFirstName,
    userLastName,
    userWeight,
    userHeight,
    userHeightIn,
    userUnits,
    userDoB,
    userId,
  } = useRegInfoStore();

  console.log(userId)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri, "image", userId);
    }
  };
  

  const uploadImage = async (uri, fileType, userId) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, "ProfilePictures/" + new Date().getTime());
      const uploadTask = uploadBytesResumable(storageRef, blob);
  
      // Listen for upload events
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Error uploading image:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
  
          // Update the user's document with the image reference
          await updateUserImageReference(userId, downloadURL);
          setImageUrl(downloadURL); // Set the image URL for UI
          console.log("Image reference updated in user document.");
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  
  const updateUserImageReference = async (userId, imageUrl) => {
    try {
      // Validate userId
      if (!userId) {
        throw new Error("Invalid userId. Make sure it's passed correctly.");
      }
  
      // Create the document reference with collection and document ID
      const userDocRef = doc(db, "users", userId);
  
      // Update the document with the image URL
      await setDoc(
        userDocRef,
        { profileImage: imageUrl }, // Add/merge the image URL
        { merge: true } // Ensure existing fields are not overwritten
      );
      console.log("Image reference added to user document.");
    } catch (error) {
      console.error("Error updating user document with image URL:", error);
    }
  };
  


  const displayWeight = () => {
    const weight = userWeight;
    const unit = userUnits === "metric" ? "kg" : "lbs";
    return `${weight} ${unit}`;
  };

  function calculateAge(userDoB) {
    const [day, month, year] = userDoB.split("/").map(Number);

    const today = new Date();
    const birthDate = new Date(year, month - 1, day); // Months are 0-indexed

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  const age = calculateAge(userDoB);

  const displayHeight = () => {
    if (userUnits === "metric") {
      return `${userHeight} cm`;
    } else {
      const inches = userHeightIn;
      const feet = userHeight;
      return `${feet}' ${inches}"`;
    }
  };

  const updateUserData = async (
    userId,
    userWeight,
    userHeight,
    userHeightIn,
    userUnits,
    userDoB
  ) => {
    try {
      const userDocRef = doc(db, "users", userId);
      await setDoc(
        userDocRef,
        {
        weight: userWeight,
        height: userHeight,
        DoB: userDoB,
        age: age,
        units: userUnits// Merge new data with existing data
        },
        { merge: true }
      ); // Merge option to update existing fields
      console.log("User data updated successfully");
      router.replace("/(tabs)/");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleUpdateUserData = () => {
    // Call the updateUserData function
    updateUserData(userId, userWeight, userHeight, userHeightIn, userUnits, userDoB)
      .then(() => {
        console.log("User data updated from button press.");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
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
              {imageUrl ? (
                <Image
                  style={{ flex: 1, width: "100%", borderRadius: 150 }}
                  contentFit="cover"
                  source={{ uri: imageUrl }}
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
              onPress={() => uploadImage(image, "images")}
            >
              <Text style={defaultStyles.btnText}>Choose an image</Text>
            </TouchableOpacity>
          </View>
          <View style={defaultStyles.card}>
            <View style={styles.subtitle}>
              <Text style={defaultStyles.btnOutlineText}>Name</Text>
              <Text style={styles.valueText}>{userFirstName}</Text>
            </View>
            <View style={styles.subtitle}>
              <Text style={defaultStyles.btnOutlineText}>Last name</Text>
              <Text style={styles.valueText}>{userLastName}</Text>
            </View>
            <View style={styles.subtitle}>
              <Text style={defaultStyles.btnOutlineText}>Age</Text>
              <Text style={styles.valueText}>{age}</Text>
            </View>
            <View style={styles.subtitle}>
              <Text style={defaultStyles.btnOutlineText}>Weight</Text>
              <Text style={styles.valueText}>{displayWeight()}</Text>
            </View>
            <View style={styles.subtitle}>
              <Text style={defaultStyles.btnOutlineText}>Height</Text>
              <Text style={styles.valueText}>{displayHeight()}</Text>
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
                onPress={handleUpdateUserData}
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

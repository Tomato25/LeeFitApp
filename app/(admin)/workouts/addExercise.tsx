import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { db, storage } from "@/firebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import WorkoutTags from "@/components/workoutTags";
import VideoPicker from "@/components/ImagePicker";
import uuid from "react-native-uuid";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const addExercise = () => {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const exerciseID = uuid.v4();

  // Function to pick an image from the gallery
  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos, // Specify format
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  // Function to upload the image and return the download URL
  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, "Exercises/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(downloadURL); // Update state
          resolve(downloadURL);
        }
      );
    });
  }

  // Function to save the exercise to Firestore
  async function submitExercise() {
    if (!exerciseTitle) {
      console.log("Please name the exercise");
      return;
    }

    try {
      // Wait for the image upload and get the URL
      const downloadURL = await uploadImage(image, "videos");
      console.log("Image uploaded to:", downloadURL);

      await saveExerciseData(downloadURL);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  // Function to save exercise data in Firestore
  async function saveExerciseData(imageUrl) {
    try {
      await setDoc(doc(collection(db, "exercises"), exerciseID), {
        id: exerciseID,
        exerciseTitle: exerciseTitle,
        tags: selectedTags,
        imageUrl: imageUrl, // Ensure this is a string
      });

      console.log(`${exerciseTitle} is successfully added to DB`);
      setImage(""); // Reset image after submission
    } catch (error) {
      console.error("Error saving document:", error);
    }
  }

  return (
    <View style={defaultStyles.container}>
      <LinearGradient
        colors={["#10123B", "#000000"]}
        style={[defaultStyles.background, { justifyContent: "space-between", gap: 70 }]}
      >
        <TextInput
          autoCapitalize="none"
          placeholder="Chest Press"
          value={exerciseTitle}
          onChangeText={setExerciseTitle}
          placeholderTextColor={Colors.light.placeholderOrange}
          style={styles.inputField}
        />

        <TouchableOpacity
          onPress={pickImage}
          style={{
            height: 175,
            width: "75%",
            borderWidth: 1,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            borderColor: Colors.light.orange,
          }}
        >
          {image ? (
            <Image style={{ flex: 1, width: "100%", borderRadius: 25 }} contentFit="cover" source={{ uri: image }} />
          ) : (
            <Ionicons name="camera" size={75} color={Colors.light.orange} />
          )}
        </TouchableOpacity>

        <WorkoutTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

        <TouchableOpacity onPress={submitExercise} style={styles.btn}>
          <Text style={defaultStyles.btnText}>Add an exercise</Text>
          <Ionicons name="add-circle-outline" size={24} color={Colors.light.blue} />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitleText: {
    color: Colors.light.orange,
    fontFamily: "outfit-sb",
    fontSize: 20,
  },
  btn: {
    backgroundColor: Colors.light.orange,
    height: 50,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginBottom: 15,
    gap: 6,
    paddingHorizontal: 20,
  },
  inputField: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.orange,
    color: Colors.light.orange,
    textAlign: "center",
    padding: 10,
    width: "60%",
    borderRadius: 8,
    fontFamily: "outfit",
    marginTop: 70,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
export default addExercise;

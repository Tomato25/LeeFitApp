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
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image } from "expo-image";
import { db, storage } from "@/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const addExercise = () => {
  const [image, setImage] = useState("");
  const [exerciseTitle, setExerciseTitle] = useState("");

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos, // here it is where we specify the allow format
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // to upload image see the next function
      await uploadImage(result.assets[0].uri, "videos");
    }
  }

  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, "Stuff/" + new Date().getTime());

    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // handle error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          // save record
          await saveRecord(fileType, downloadURL, new Date().toISOString());
          setImage("");
        });
      }
    );
  }

  async function saveRecord(fileType, url, createdAt) {
    try {
      const docRef = await addDoc(collection(db, "files"), {
        fileType,
        url,
        createdAt,
      });
      console.log("document saved correctly", docRef.id);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={defaultStyles.container}>
      <LinearGradient
        colors={["#10123B", "#000000"]}
        style={[
          defaultStyles.background,
          { justifyContent: "space-between", gap: 70 },
        ]}
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
        <TouchableOpacity style={styles.btn}>
          <Text style={defaultStyles.btnText}>Add an exercise</Text>
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={Colors.light.blue}
          />
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

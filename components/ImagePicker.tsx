import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '@/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function VideoPicker({image, setImage}) {

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
    <TouchableOpacity
    onPress={() => pickImage()}
    style={{
      height: 175,
      width: "75%",
      borderWidth: 1,
      borderRadius:25,
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
  )
}
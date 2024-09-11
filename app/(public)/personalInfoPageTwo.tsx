import {
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';

export default function App() {
  const [image, setImage] = useState(null);

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
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          marginTop:200
        }}>
        <TouchableOpacity onPress={() => pickImage()} style={{height:200, width:200, borderWidth:2, borderRadius:99, justifyContent:"center", alignItems:"center" }}>
        {image ?         
        <Image style={{ flex: 1, width: '100%', borderRadius:99}} contentFit="cover" source={{ uri: image }} /> : <Ionicons name="camera" size={75}/>}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '90%',
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            alignItems: 'center',
          }}
          onPress={() => pickImage()}>
          <Text>Pick an image from camera roll</Text>
        </TouchableOpacity>
        
      </View>
      <View
        style={{ justifyContent: 'center', alignItems: 'center', gap: 10, width:"100%"}}>
        <View style={{flexDirection:"row", justifyContent:"space-around",gap:20}}> 
        <TouchableOpacity
          style={{
            width: '40%',
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Text>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '40%',
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Text>Next</Text>
        </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 99,
              borderWidth: 1,
            }}></View>
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 99,
              borderWidth: 1,
              backgroundColor: 'black',
            }}></View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  unitContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
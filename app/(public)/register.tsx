import { View, Text, TouchableOpacity,StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { auth } from '@/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import { Image } from "expo-image";
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { db } from '@/firebaseConfig'
import { addDoc, collection, doc, setDoc } from '@firebase/firestore'
import Toast from "react-native-root-toast";

const register = () => {

  const [repeatEmail, setRepeatEmail] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);

  const usersRef = collection(db, "users")
  let errorMessage;
  const signUp = () =>  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

    const userID = userCredential.user.uid;

    setDoc(doc(usersRef, `${userID}`), {id: userID, firstName: firstName, lastName: lastName,  email:email, role:"user"})
    router.replace("/(tabs)");
  })
  .catch((error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "Email already in use !";
        break;
      case "auth/invalid-credential":
        errorMessage = "You have entered an invalid username or password";
        break;
      case "auth/invalid-email":
        errorMessage = "Please enter valid email address";
        break;
      default:
        errorMessage = "Something went wrong !";
        break;
    }
    let toast = Toast.show(`❌ ${errorMessage}`, {
      duration: Toast.durations.LONG,
      position: Toast.positions.TOP+25,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      opacity: 1,
      textColor: "#FF4545",
      backgroundColor: "#f0f0f0"
    });
  });


  return (
    <View style={styles.container}>
      <LinearGradient colors={["#10123B", "#000000"]} style={styles.background}>
        <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
        <View style={[styles.container, { width: "90%", gap: 30 }]}>
          {!pendingVerification && (
            <>
            <TextInput
                autoCapitalize="none"
                placeholder="John"
                placeholderTextColor={Colors.light.orange}
                value={firstName}
                onChangeText={setFirstName}
                style={defaultStyles.inputField}
              />
              <TextInput
                autoCapitalize="none"
                placeholder="Doe"
                placeholderTextColor={Colors.light.orange}
                value={lastName}
                onChangeText={setLastName}
                style={defaultStyles.inputField}
              />
              <TextInput
                autoCapitalize="none"
                placeholder="Email"
                placeholderTextColor={Colors.light.orange}
                value={email}
                onChangeText={setEmail}
                style={defaultStyles.inputField}
              />
              <TextInput
                autoCapitalize="none"
                placeholder="Repeat Email"
                placeholderTextColor={Colors.light.orange}
                value={repeatEmail}
                onChangeText={setRepeatEmail}
                style={defaultStyles.inputField}
              />
              <TextInput
                placeholder="Password"
                value={password}
                placeholderTextColor={Colors.light.orange}
                onChangeText={setPassword}
                secureTextEntry
                style={defaultStyles.inputField}
              />
              <TextInput
                placeholder="Repeat Password"
                value={repeatPassword}
                placeholderTextColor={Colors.light.orange}
                onChangeText={setRepeatPassword}
                secureTextEntry
                style={defaultStyles.inputField}
              />

              <Pressable onPress={() => signUp()} style={defaultStyles.btn}>
                <Text>Sign up</Text>
              </Pressable>
            </>
          )}

     {/*      {pendingVerification && (
            <>
              <View style={styles.container}>
                <TextInput
                  value={code}
                  placeholder="Code..."
                  placeholderTextColor={Colors.light.orange}
                  style={defaultStyles.inputField}
                  onChangeText={setCode}
                />
              </View>
              <TouchableOpacity
                onPress={onPressVerify}
                style={[defaultStyles.btn, {marginBottom:25}]}
              >
                <Text style={defaultStyles.btnText}>
                Verify Email
                </Text>
              </TouchableOpacity>
            </>
          )} */}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  image: {
    flex: 1,
    width: 400,
    height: "100%",
  },
  imageContainer: {
    height: "50%",
  },
});

export default register
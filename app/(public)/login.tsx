import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import { Image } from "expo-image";
import * as WebBrowser from "expo-web-browser";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Toast from "react-native-root-toast";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import { useUserStore } from "@/store/sessionStore";

WebBrowser.maybeCompleteAuthSession();

const login = () => {
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordText, setErrorPasswordText] = useState("");
  const [errorText, setErrorText] = useState("");

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, setUserInfo } = useUserStore((state) => ({
    userInfo: state.userInfo,
    setUserInfo: state.setUserInfo,
  }));

  let errorMessage;

  const signIn = async () => {
    if (!emailAddress) {
      setErrorEmail(true);
      setErrorText("Please enter valid email");
    }

    if (!password) {
      setErrorPassword(true);
      setErrorPasswordText("Please enter valid password");
    }

    if (!emailAddress || !password) {
      return;
    }

    signInWithEmailAndPassword(auth, emailAddress, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("id", "==", user.uid));
        console.log(user);

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const userInfo = doc.data();
          setUserInfo(userInfo);
          console.log(userInfo);
        });

        if (userInfo.role == "user") {
          router.replace("/(tabs)");
        } else if (userInfo.role == "admin") {
          router.replace("/(admin)");
        }
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "Email already in use !";
            setErrorEmail(true);
            setErrorText(errorMessage);
            break;
          case "auth/invalid-credential":
            errorMessage = "You have entered an invalid username or password";
            setErrorEmail(true);
            setErrorText(errorMessage);
            break;
          case "auth/invalid-email":
            errorMessage = "You have entered an invalid username or password";
            setErrorEmail(true);
            setErrorText(errorMessage);
            break;
          default:
            errorMessage = "Something went wrong !";
            setErrorEmail(true);
            setErrorText(errorMessage);
            break;
        }
      });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#10123B", "#000000"]} style={styles.background}>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              contentFit="contain"
              source={require("../../assets/images/athlete.png")}
            />
          </View>
          <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            placeholder="Email"
            value={emailAddress}
            onChangeText={setEmailAddress}
            placeholderTextColor={Colors.light.placeholderOrange}
            onFocus={() => setErrorEmail(false)}
                  style={[
                    defaultStyles.inputField,
                    errorEmail ? { borderBottomColor: "#ff5733" } : null,
                  ]}
                />
                {errorEmail ? (
                  <Text style={styles.errorMessage}>{errorText}</Text>
                ) : (
                  <></>
                )}
              </View>
              <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={Colors.light.placeholderOrange}
            onFocus={() => setErrorPassword(false)}
            style={[
              defaultStyles.inputField,
              errorPassword ? { borderBottomColor: "#ff5733" } : null,
            ]}
          />
          {errorPassword ? (
            <Text style={styles.errorMessage}>{errorPasswordText}</Text>
          ) : (
            <></>
          )}
        </View>

          <TouchableOpacity style={defaultStyles.btn} onPress={signIn}>
            <Text style={defaultStyles.btnText}>Continue</Text>
          </TouchableOpacity>
          <Link href="/(public)/reset" asChild>
            <Pressable>
              <Text style={styles.links}>Forgot password?</Text>
            </Pressable>
          </Link>
          <Link href="/(public)/register" asChild>
            <Pressable>
              <Text style={styles.links}>Create Account</Text>
            </Pressable>
          </Link>
          <View style={styles.seperatorView}>
            <View
              style={{
                flex: 1,
                borderBottomColor: "#FF8B00",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text style={styles.seperator}>or</Text>
            <View
              style={{
                flex: 1,
                borderBottomColor: "#FF8B00",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>
          <TouchableOpacity
            style={[defaultStyles.btnOutline, { marginBottom: 20 }]}
          >
            <Ionicons
              name="logo-google"
              size={24}
              color={Colors.light.orange}
              style={defaultStyles.btnIcon}
            />
            <Text style={defaultStyles.btnOutlineText}>
              Sign in with Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[defaultStyles.btnOutline, { marginBottom: 30 }]}
          >
            <Ionicons
              name="logo-apple"
              size={24}
              color={Colors.light.orange}
              style={defaultStyles.btnIcon}
            />
            <Text style={defaultStyles.btnOutlineText}>Sign in with Apple</Text>
          </TouchableOpacity>
        </ScrollView>
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
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  seperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
    width: "90%",
  },
  seperator: {
    fontFamily: "outfit-sb",
    color: Colors.light.orange,
  },
  image: {
    flex: 1,
    width: 400,
    height: 300,
  },
  imageContainer: {
    height: 300,
  },
  links: {
    color: Colors.light.orange,
    fontFamily: "outfit-sb",
    marginTop: 15,
  },
  errorContainer: {
    borderRadius: 8,
    padding: 5,
    width: "90%",
    height: 35,
    marginBottom: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  errorMessage: {
    color: "#ff5733",
    fontFamily: "outfit",
    padding: 5,
    width: "90%",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30
  },
  inputField: {
    height: 50,
    borderBottomWidth:1,
    color: Colors.light.orange,
    backgroundColor: Colors.light.blue,
    padding: 10,
    width: "90%",
    borderRadius: 8,
    fontFamily: "outfit",
  },
});

export default login;

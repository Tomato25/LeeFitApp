import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { auth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router, Stack } from "expo-router";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { db } from "@/firebaseConfig";
import { addDoc, collection, doc, setDoc } from "@firebase/firestore";

const register = () => {
  const [email, setEmail] = useState("");
  const [repeatEmail, setRepeatEmail] = useState("");
  const [errorRepeatEmail, setErrorRepeatEmail] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorRepeatPassword, setErrorRepeatPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordText, setErrorPasswordText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [firstName, setFirstName] = useState("");
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [lastName, setLastName] = useState("");
  const [errorLastName, setErrorLastName] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  const isPasswordConfirmed = (password: String, repeatPassword: String) => {
    if (password && repeatPassword && password === repeatPassword) return true;
    return false;
  };

  const isEmailConfirmed = (email: String, repeatEmail: String) => {
    if (email && repeatEmail && email === repeatEmail) return true;
    return false;
  };

  const usersRef = collection(db, "users");
  let errorMessage;
  const signUp = () => {
    if (!isPasswordConfirmed(password, repeatPassword)) {
      setErrorRepeatPassword(true);
    }

    if (!isEmailConfirmed(password, repeatPassword)) {
      setErrorRepeatEmail(true);
    }

    if(!firstName){
      setErrorFirstName(true)
    }
    if(!lastName){
      setErrorLastName(true)
    }
    if(!email){
      setErrorEmail(true);
      setErrorText("Please enter valid email")
    }

    if(!password){
      setErrorPassword(true);
      setErrorPasswordText("Please enter valid password")
    }

    if (
      !isPasswordConfirmed(password, repeatPassword) ||
      !isEmailConfirmed(email, repeatEmail) ||
      !firstName ||
      !lastName
    ) {
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userID = userCredential.user.uid;

        setDoc(doc(usersRef, `${userID}`), {
          id: userID,
          firstName: firstName,
          lastName: lastName,
          email: email,
          role: "user",
        });
        router.replace("/(public)/personalInfoPageOne");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "Email already in use!";
            setErrorEmail(true);
            setErrorText(errorMessage);
            break;
          case "auth/invalid-credential":
            errorMessage = "You have entered an invalid username or password";

            break;
          case "auth/invalid-email":
            errorMessage = "Please enter valid email address";
            setErrorEmail(true);
            setErrorText(errorMessage);
            break;
          case "auth/weak-password":
            errorMessage = "Please choose a stronger password";
            setErrorPassword(true);
            setErrorText(errorMessage);
            break;
          default:
            errorMessage = "Something went wrong !";
            break;
        }
        console.log(error.code + errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#10123B", "#000000"]} style={styles.background}>
        <ScrollView contentContainerStyle={{ alignItems: "center", width: Dimensions.get("screen").width, gap: 30, paddingTop:60 }}>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCapitalize="none"
                  placeholder="John"
                  placeholderTextColor={Colors.light.placeholderOrange}
                  value={firstName}
                  onChangeText={setFirstName}
                  onFocus={() => setErrorFirstName(false)}
                  style={[
                    defaultStyles.inputField,
                    errorFirstName ? { borderBottomColor: "#ff5733" } : null,
                  ]}
                />
                {errorFirstName ? (
                  <Text style={styles.errorMessage}>Please enter first name</Text>
                ) : (
                  <></>
                )}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  autoCapitalize="none"
                  placeholder="Doe"
                  placeholderTextColor={Colors.light.placeholderOrange}
                  value={lastName}
                  onChangeText={setLastName}
                  onFocus={() => setErrorLastName(false)}

                  style={[
                    defaultStyles.inputField,
                    errorLastName ? { borderBottomColor: "#ff5733" } : null,
                  ]}
                />
                 {errorLastName ? (
                  <Text style={styles.errorMessage}>Please enter last name</Text>
                ) : (
                  <></>
                )}
              </View>
              <View style={styles.inputContainer}>

                <TextInput
                  autoCapitalize="none"
                  placeholder="Email"
                  placeholderTextColor={Colors.light.placeholderOrange}
                  value={email}
                  onChangeText={setEmail}
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
                  autoCapitalize="none"
                  placeholder="Repeat Email"
                  placeholderTextColor={Colors.light.placeholderOrange}
                  value={repeatEmail}
                  onChangeText={setRepeatEmail}
                  onFocus={() => setErrorRepeatEmail(false)}

                  style={[
                    defaultStyles.inputField,
                    errorRepeatEmail ? { borderBottomColor: "#ff5733" } : null,
                  ]}
                />
                {errorRepeatEmail ? (
                  <Text style={styles.errorMessage}>Emails do not match</Text>
                ) : (
                  <></>
                )}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Password"
                  value={password}
                  placeholderTextColor={Colors.light.placeholderOrange}
                  onChangeText={setPassword}
                  onFocus={() => setErrorPassword(false)}

                  secureTextEntry
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
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Repeat Password"
                  value={repeatPassword}
                  placeholderTextColor={Colors.light.placeholderOrange}
                  onChangeText={setRepeatPassword}
                  onFocus={() => setErrorRepeatPassword(false)}
                  secureTextEntry
                  style={[
                    defaultStyles.inputField,
                    errorRepeatPassword
                      ? { borderBottomColor: "#ff5733" }
                      : null,
                  ]}
                />
                {errorRepeatPassword ? (
                  <Text style={styles.errorMessage}>
                    Passwords do not match
                  </Text>
                ) : (
                  <></>
                )}
              </View>
           <TouchableOpacity onPress={() => signUp()} style={defaultStyles.btn}>
                <Text style={defaultStyles.btnText}>Sign up</Text>
            </TouchableOpacity>
         <Link href={"/(public)/personalInfoPageOne"}><Text style={{color: "white"}}>Next</Text></Link>
      

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
    width:"100%"
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
  },
});

export default register;

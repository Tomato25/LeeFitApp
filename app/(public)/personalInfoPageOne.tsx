import {
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import PickerComponent from "@/components/Picker";
import { useRegInfoStore } from "@/store/sessionStore";
import DoBPicker from "@/components/DoB";
import dayjs from "dayjs";

interface WeightRangeType {
  weightRange: number[]; // weightRange is an array of numbers
}

export default function App() {
  const [weightRange, setWeightRange] = useState<number[]>([]); // Fix: define the type of weightRange
  const [heightRange, setHeightRange] = useState<number[]>([]); // Fix: define the type of weightRange

  const [gender, setGender] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const inches = Array.from({ length: 12 }, (_, i) => i + 1).concat('');


  
  const now = dayjs().format("DD-MM-YYYY")

  const {
    userWeight,
    setUserWeight,
    userHeight,
    setUserHeight,
    userUnits,
    setUserUnits,
    modalVisible,
    setModalVisible,
    userDoB,
  } = useRegInfoStore();

  useEffect(() => {
    setUserUnits("metric");
    setWeightRange(Array.from({ length: 101 }, (_, i) => i + 30)); // Fix: Use "_" for unused variable
    setHeightRange(Array.from({ length: 101 }, (_, i) => i + 130)); // Fix: Use "_" for unused variable

  }, []);

  const selectUnits = () => {
    if (userUnits === "metric") {
      setUserUnits("imperial");
      setWeightRange(Array.from({ length: 280 }, (_, i) => i + 70)); // Fix: Adjust the type for weightRange
      setHeightRange(Array.from({ length: 8 }, (_, i) => i + 1).concat('')); // 
    } else {
      setUserUnits("metric");
      setWeightRange(Array.from({ length: 101 }, (_, i) => i + 30));
      setHeightRange(Array.from({ length: 101 }, (_, i) => i + 130)); // Fix: Adjust the type for weightRange

    }
  };


  return (
    <View style={styles.container}>
    <LinearGradient colors={["#10123B", "#000000"]} style={styles.background}>
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DoBPicker />
            <TouchableOpacity
              style={[defaultStyles.btn, {width: 150}]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={defaultStyles.btnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View
        style={{
          justifyContent: "space-around",
          alignItems: "center",
          width: Dimensions.get("screen").width,
          gap: 30,
          flex: 1,
        }}
      >
        <View style={styles.unitContainer}>
          <TouchableOpacity onPress={selectUnits}>
            <Text
              style={[
                {
                  color: Colors.light.placeholderOrange,
                  fontSize: 16,
                  fontFamily: "outfit",
                },
                userUnits === "imperial"
                  ? { fontWeight: "bold", color: Colors.light.orange }
                  : { fontWeight: "normal" },
              ]}
            >
              Imperial
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: "100%",
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: Colors.light.orange,
            }}
          />
          <TouchableOpacity onPress={selectUnits}>
            <Text
              style={[
                {
                  color: Colors.light.placeholderOrange,
                  fontSize: 16,
                  fontFamily: "outfit",
                },
                userUnits === "metric"
                  ? { fontWeight: "bold", color: Colors.light.orange }
                  : { fontWeight: "normal" },
              ]}
            >
              Metric
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: "90%" }}>
          <Text style={styles.subtitleText}>Height</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: 120,
            }}
          >
              <PickerComponent data={heightRange} />
            <Text
              style={[
                styles.subtitleText,
                { height: 120, verticalAlign: "middle" },
              ]}
            >
              {userUnits === "metric" ? "cm" : "ft"}
            </Text>
            {userUnits === "imperial" && 
            <>
            <PickerComponent data={inches}/> 
            <Text
              style={[
                styles.subtitleText,
                { height: 120, verticalAlign: "middle" },
              ]}
            >
              in
            </Text></>
            }
          
          </View>
        </View>

        <View style={{ width: "90%" }}>
          <Text style={styles.subtitleText}>Weight</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: 120,
            }}
          >
              <PickerComponent data={weightRange} />
            <Text
              style={[
                styles.subtitleText,
                { height: 120, verticalAlign: "middle" },
              ]}
            >
              {userUnits === "metric" ? "kg" : "lbs"}
            </Text>
          </View>
        </View>

        <View style={{ width: "90%" }}>
          <Text style={styles.subtitleText}>Date of birth</Text>
          <TouchableOpacity  onPress={() => setModalVisible(true)} style={{alignSelf: "center"}}><Text style={styles.itemText}>{userDoB}</Text></TouchableOpacity>
        </View>

        <View style={{ width: "90%" }}>
          <Text style={styles.subtitleText}>Gender</Text>
          <View style={styles.unitContainer}>
            <TouchableOpacity
              onPress={() => setGender("female")}
              style={[
                styles.genderButton,
                gender === "female"
                  ? { backgroundColor: Colors.light.orange }
                  : null,
              ]}
            >
              <Ionicons
                name="female-outline"
                size={20}
                color={gender === "female" ? "black" : Colors.light.orange}
              />
              <Text
                style={[
                  styles.textBtn,
                  gender === "female" ? styles.chosenTextBtn : null,
                ]}
              >
                Female
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setGender("male")}
              style={[
                styles.genderButton,
                gender === "male"
                  ? { backgroundColor: Colors.light.orange }
                  : null,
              ]}
            >
              <Ionicons
                name="male-outline"
                size={20}
                color={gender === "male" ? "black" : Colors.light.orange}
              />
              <Text
                style={[
                  styles.textBtn,
                  gender === "male" ? styles.chosenTextBtn : null,
                ]}
              >
                Male
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setGender("other")}
              style={[
                styles.genderButton,
                gender === "other"
                  ? { backgroundColor: Colors.light.orange }
                  : null,
              ]}
            >
              <FontAwesome
                name="transgender-alt"
                size={20}
                color={gender === "other" ? "black" : Colors.light.orange}
              />
              <Text
                style={[
                  styles.textBtn,
                  gender === "other" ? styles.chosenTextBtn : null,
                ]}
              >
                Other
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Link
          href={"/(public)/personalInfoPageTwo"}
          style={defaultStyles.btnOutlineText}
        >
          Next
        </Link>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 99,
              borderWidth: 1,
              backgroundColor: Colors.light.orange,
            }}
          />
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 99,
              borderWidth: 1,
              backgroundColor: Colors.light.placeholderOrange,
            }}
          />
        </View>
      </View>
    </LinearGradient>
  </View>
);
}

const styles = StyleSheet.create({
  genderButton: {
    height: 75,
    width: 85,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    gap: 5,
    borderColor: Colors.light.orange,
  },
  textBtn: {
    color: Colors.light.orange,
    fontFamily: "outfit",
  },
  chosenTextBtn: {
    color: "black",
    fontFamily: "outfit",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  unitContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  subtitleText: {
    fontFamily: "outfit",
    color: Colors.light.orange,
    alignSelf: "flex-start",
    marginBottom: 15,
    fontSize: 26,
  },
  itemText: {
    fontSize: 20,
    color: Colors.light.placeholderBlue,
    fontFamily: "outfit-sb",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.light.blue,
    borderRadius: 20,

    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

});

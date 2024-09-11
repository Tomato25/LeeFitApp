import {
    Text,
    SafeAreaView,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    View,
    ScrollView,
    Dimensions,
  } from 'react-native';
  import { useState, useEffect } from 'react';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
  
  export default function App() {
    const [units, setUnits] = useState('metric');
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
  
  
    const selectUnits = () => {
      if (units == 'metric') {
        setUnits('imperial');
      } else {
        setUnits('metric');
      }
      console.log(units);
    };
  
    return (
        <View style={styles.container}>
        <LinearGradient colors={["#10123B", "#000000"]} style={styles.background}>
        <ScrollView contentContainerStyle={{justifyContent:"space-around", alignItems: "center", width: Dimensions.get("screen").width, gap: 30, flex:1 }}>
        <View style={styles.unitContainer}>
          <TouchableOpacity onPress={selectUnits}>
            <Text
              style={[ {color: Colors.light.placeholderOrange, fontSize:16, fontFamily: "outfit"},
                units === 'imperial'
                  ? { fontWeight: 'bold',color: Colors.light.orange }
                  : { fontWeight: 'normal' }
              ]}>
              Imperial
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: '100%',
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: Colors.light.orange
            }}></View>
          <TouchableOpacity onPress={selectUnits}>
            <Text
              style={[ {color: Colors.light.placeholderOrange, fontSize:16, fontFamily: "outfit"},
                units === 'metric'
                  ? { fontWeight: 'bold', color: Colors.light.orange }
                  : { fontWeight: 'normal' }
              ]}>
              Metric
            </Text>
          </TouchableOpacity>
        </View>
  
        <View style={{ width: '90%' }}>
          <Text style={styles.subtitleText}>Height</Text>
        </View>
        <View style={{ width: '90%' }}>
          <Text style={styles.subtitleText}>Weight</Text>
        </View>
        <View style={{ width: '90%' }}>
          <Text style={styles.subtitleText}>Date of birth</Text>  
        </View>
        <View style={{ width: '90%' }}>
          <Text style={styles.subtitleText}>Gender</Text>
          <View style={styles.unitContainer}>
            <TouchableOpacity onPress={() => setGender("female")} style={[styles.genderButton,  gender == "female" ? {backgroundColor:Colors.light.orange} : null]}>
              <Ionicons name="female-outline" size={20} color={gender == "female" ? "black" : Colors.light.orange} />
              <Text style={[styles.textBtn, gender == "female" ? styles.chosenTextBtn : null]}>Female</Text>
            </TouchableOpacity>
             <TouchableOpacity onPress={() => setGender("male")}  style={[styles.genderButton,  gender == "male" ? {backgroundColor:Colors.light.orange} : null]}>
              <Ionicons name="male-outline" size={20} color={gender == "male" ? "black" : Colors.light.orange} />
              <Text style={[styles.textBtn, gender == "male" ? styles.chosenTextBtn : null]}>Male</Text>
            </TouchableOpacity>
             <TouchableOpacity onPress={() => setGender("other")}  style={[styles.genderButton,  gender == "other" ? {backgroundColor:Colors.light.orange} : null]}>
            <FontAwesome name="transgender-alt" size={20} color={gender == "other" ? "black" : Colors.light.orange} />            
            <Text style={[styles.textBtn, gender == "other" ? styles.chosenTextBtn : null]}>Other</Text>
            </TouchableOpacity>
          </View>
        </View>
       <Link href={"/(public)/personalInfoPageTwo"} style={defaultStyles.btnOutlineText}>Next</Link>
        <View style={{flexDirection:"row", gap:10}}>
        <View style={{height:10, width:10, borderRadius:99, borderWidth:1, backgroundColor:Colors.light.orange}}></View>
        <View style={{height:10, width:10, borderRadius:99, borderWidth:1, backgroundColor:Colors.light.placeholderOrange}}></View>
        </View>
        </ScrollView>
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
      paddingHorizontal:15,
      display: "flex",
      justifyContent:"center",
      alignItems: 'center',
      marginRight: 10,
      gap:5,
      borderColor: Colors.light.orange,
    },
    textBtn: {
        color:  Colors.light.orange,
        fontFamily: "outfit"
   },
   chosenTextBtn: {
       color: "black",
       fontFamily: "outfit"
   },
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
    unitContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    subtitleText:{
        fontFamily: "outfit",
        color: Colors.light.orange,
        alignSelf: 'flex-start', 
        marginBottom:15,
         fontSize: 26 
    }
  });
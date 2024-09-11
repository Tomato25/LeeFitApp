import {
    Text,
    SafeAreaView,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    View,
  } from 'react-native';
  import moment from 'moment';
  import { useState, useEffect } from 'react';
  import uuid from 'react-native-uuid';
import Colors from '@/constants/Colors';
import nextSevenDaysType from '@/constants/Types';
import Ionicons from '@expo/vector-icons/Ionicons';
  

  export default function WeekTracker() {
    const [next7Days, setNext7Days] = useState<nextSevenDaysType[]>([]);

    const [selectedDate, setSelectedDate] = useState();

  
    useEffect(() => {
      getDays();
    }, []);
  
    const getDays = () => {
      const today = moment();
      const nextSevenDays  = [];
      for (let i = 0; i < 7; i++) {
        const date = moment().add(i, 'days');
        nextSevenDays.push({
          day: date.format('ddd'), // Tue, Mon
          formmatedDate: date.format('Do MMM'),
          id: uuid.v4(), //4th Oct
        });
      }
  
      setNext7Days(nextSevenDays);
    };
  
   
  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{ marginTop: 10, }}
          data={next7Days}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({ item <nextSevenDaysType> }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedDate(item.id);
              }}>
              <View
                style={
                  styles.dayButton            
                }>
                <Text style={
                  styles.textBtn}>{item.day.toUpperCase()}</Text>
                <Text style={
                  [styles.textBtn , {fontFamily:"outfit"}]
                  }>{item.formmatedDate}</Text>
                 <Ionicons name="checkmark-circle-outline" size={24} color={Colors.light.orange} /> 
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item: String) => item.id}
        />
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    dayButton: {
      borderWidth: 1,
      borderRadius: 25,
      padding: 5,
      paddingHorizontal: 10,
      alignItems: 'center',
      marginRight: 10,
      marginTop: 20,
      borderColor: Colors.light.lightblue,
      
    },
    textBtn: {
         color:  Colors.light.lightblue,
         fontFamily: "outfit-sb"
    },
    chosenTextBtn: {
        color: "black",
        fontFamily: "outfit"
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap:0,
      height: 200,
      width: "100%"
    },
  });
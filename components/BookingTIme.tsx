import {
    Text,
    SafeAreaView,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    View,
    TextInput
  } from 'react-native';
  import moment from 'moment';
  import { useState, useEffect } from 'react';
  import uuid from 'react-native-uuid';
import nextSevenDaysType from '@/constants/Types';
import timeListType from '@/constants/Types';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

  
  export default function BookingTime() {
    const [next7Days, setNext7Days] = useState<nextSevenDaysType[]>([]);
    const [timeList, setTimeList] = useState<timeListType[]>([]);
  
    const [selectedDate, setSelectedDate] = useState();
    const [selectedTime, setSelectedTime] = useState();
  
    useEffect(() => {
      getDays();
      getTime();
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
  
    const getTime = () => {
      const timeList = [];
      for (let i = 8; i < 12; i++) {
        timeList.push({
          time: i + ':00 AM',
          id: uuid.v4(),
        });
        timeList.push({
          time: i + ':30 AM',
          id: uuid.v4(),
        });
      }
      timeList.push({
        time: 12 + ':00 PM',
        id: uuid.v4(),
      });
      timeList.push({
        time: 12 + ':30 PM',
        id: uuid.v4(),
      });
      for (let i = 1; i <= 6; i++) {
        timeList.push({
          time: i + ':00 PM',
          id: uuid.v4(),
        });
        timeList.push({
          time: i + ':30 PM',
          id: uuid.v4(),
        });
      }
      setTimeList(timeList);
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ marginTop: 20, marginLeft:10, fontSize: 20, color: Colors.light.orange, fontFamily: "outfit-sb"}}>Day</Text>
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
                style={[
                  styles.dayButton,
                  selectedDate == item.id ? { backgroundColor: '#ff8c00'} : null,
                ]}>
                <Text style={[
                  styles.textBtn,
                  selectedDate == item.id ? styles.chosenTextBtn : null,
                ]}>{item.day}</Text>
                <Text style={[
                  styles.textBtn,
                  selectedDate == item.id ? styles.chosenTextBtn : null,
                ]}>{item.formmatedDate}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item: String) => item.id}
        />
        <Text style={{ marginLeft:10, fontSize: 20,color: Colors.light.orange, fontFamily: "outfit-sb"}}>Time</Text>
        <FlatList
          style={{ marginTop: 10,  }}
          data={timeList}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedTime(item.id);
              }}>
              <View
                style={[
                  styles.dayButton,
                  selectedTime == item.id ? { backgroundColor: '#ff8c00' } : null,
                ]}>
                <Text style={[
                  styles.textBtn,
                  selectedTime == item.id ? styles.chosenTextBtn : null,
                ]}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item: String) => item.id}
        />
        <Text style={{ marginTop: 20, marginLeft:10, fontSize: 20, color: Colors.light.orange, fontFamily: "outfit-sb" }}>Note</Text>
        <TextInput 
        numberOfLines={4}
        style={{borderWidth:1, borderColor:'#ff8c00', color: Colors.light.orange, fontFamily: "outfit",  marginHorizontal: "auto", borderRadius: 15, padding:10, textAlignVertical: "top", width:"90%", marginVertical:20}}
        placeholder="Write notes here"
        placeholderTextColor= {Colors.light.orange}    
        />
        <TouchableOpacity style={[defaultStyles.btn, {marginHorizontal: "auto"}]}>
        <Text style={defaultStyles.btnText}>Book a class</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    dayButton: {
      borderWidth: 1,
      borderRadius: 99,
      padding: 5,
      paddingHorizontal: 20,
      alignItems: 'center',
      marginRight: 10,
      borderColor: '#ff8c00',
      
    },
    textBtn: {
         color:  Colors.light.orange,
         fontFamily: "outfit"
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
      height: 450,
      width: "100%"
    },
  });
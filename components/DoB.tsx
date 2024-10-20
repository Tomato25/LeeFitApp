import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs'; 
import { useEffect, useState,  } from 'react';
import { StyleSheet, View } from "react-native"
import Colors from '@/constants/Colors';
import { useRegInfoStore } from '@/store/sessionStore';

export default function DoBPicker() {
  const [date, setDate] = useState(dayjs());

  const {
    modalVisible,
    setModalVisible,
    userDoB,
    setUserDoB
  } = useRegInfoStore();

  useEffect(() => {
    setUserDoB(date.format("DD/MM/YYYY"))
    console.log(date)
  }, [setDate])

  return (
    <View>
      <DateTimePicker
        mode="single"
        date={date}
        initialView="year"
        maxDate={dayjs()}
        onChange={(params) => {setDate(params.date);}}
        calendarTextStyle={{color: Colors.light.orange, fontFamily:"outfit"}}
        selectedItemColor={Colors.light.orange}
        headerTextStyle={{color: Colors.light.orange, fontFamily:"outfit"}}
        headerButtonColor={Colors.light.orange}
        weekDaysTextStyle={{color: Colors.light.orange, fontFamily:"outfit"}}
        weekDaysContainerStyle={{borderColor:Colors.light.orange}}	
        yearContainerStyle={{backgroundColor: Colors.light.blue, borderColor: Colors.light.orange}}	
        monthContainerStyle={{backgroundColor: Colors.light.blue, borderColor: Colors.light.orange}}	
      />
    </View>
  );
}

const styles = StyleSheet.create({
    
});
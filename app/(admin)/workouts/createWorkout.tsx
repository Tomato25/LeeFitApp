import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { defaultStyles } from '@/constants/Styles'
import BookingTime from '@/components/BookingTIme'
import Ionicons from '@expo/vector-icons/Ionicons'
import Octicons from '@expo/vector-icons/build/Octicons'
import Colors from '@/constants/Colors';

const createWorkout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  const workouts = [
    {
      id: 'sadsasadsfsadfa',
      date: '23.4.24',
      day: 'Monday',
      workouts: [
        {
          name: 'DB curls',
          sets: '3',
          reps: '12',
          weight: '8',
        },
        {
          name: 'DB curls',
          sets: '3',
          reps: '12',
          weight: '8',
        },
        {
          name: 'DB curls',
          sets: '3',
          reps: '12',
          weight: '8',
        },
      ],
    },
    {
      id: 'sadsadfasdawq',
      date: '23.4.24',
      day: 'Monday',
      workouts: [
        {
          name: 'DB curls',
          sets: '3',
          reps: '12',
          weight: '8',
        },
        {
          name: 'DB curls',
          sets: '3',
          reps: '12',
          weight: '8',
        },
      ],
    },
  ];



  return (
    <View style={defaultStyles.container}>
    <LinearGradient
      colors={["#10123B", "#000000"]}
      style={[defaultStyles.background]}
    >
      <SafeAreaView style={styles.container}>
      <View
        style={{
          padding: 5,
          paddingHorizontal: 15,
          backgroundColor: '#ff8c00',
          borderRadius: 15,
        }}>
        <Text style={{ textAlign: 'center' }}>28/06 - 03/06</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
          borderRadius: 15,
          backgroundColor: Colors.light.blue,
          paddingHorizontal: 15,
          padding: 15,
        }}>
        <Text
          style={{
            color: '#ff8c00',
          }}>
          Client
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={{ color: '#0096FF' }}>Lucija Grba</Text>
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 99,
              backgroundColor: '#ff8c00',
              borderColor: '#ff8c00',
            }}></View>
        </View>
      </View>
      <FlatList
        contentContainerStyle={{ marginTop: 10, width: '90%', alignItems: 'center' }}
        data={workouts}
        horizontal={false}
        renderItem={({ item }) => (
          <View style={styles.workoutContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <Text
                style={{
                  color: '#ff8c00',
                }}>
                {item.day}
              </Text>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Text style={{ color: '#0096FF' }}>{item.date}</Text>
                {isOpen ? (
                  <TouchableOpacity onPress={() => toggleCard()}>
                    <Octicons name="chevron-down" size={24} color="#ff8c00" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => toggleCard()}>
                    <Octicons name="chevron-up" size={24} color="#ff8c00" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            { isOpen ? 
            <FlatList
              style={{ marginTop: 10, width: '100%', alignItems: 'center' }}
              data={item.workouts}
              horizontal={false}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 5,
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: '#0096FF',
                    color: '#ff8c00',
                    marginBottom: 10,
                    paddingBottom: 10,
                    width: '100%',
                  }}>
                  <Text style={{ color: '#0096FF' }}>{item.name}</Text>
                  <View
                    style={{
                      height: 6,
                      width: 6,
                      borderRadius: 99,
                      borderColor: '#ff8c00',
                      backgroundColor: '#ff8c00',
                    }}></View>
                  <Text style={{ color: '#ff8c00' }}>
                    {item.sets} <Text style={{ color: '#0096FF' }}>sets</Text>
                  </Text>
                  <View
                    style={{
                      height: 6,
                      width: 6,
                      borderRadius: 99,

                      borderColor: '#ff8c00',
                      backgroundColor: '#ff8c00',
                    }}></View>
                  <Text style={{ color: '#ff8c00' }}>
                    {item.reps} <Text style={{ color: '#0096FF' }}>reps</Text>
                  </Text>
                  <View
                    style={{
                      height: 6,
                      width: 6,
                      borderRadius: 99,
                      borderColor: '#ff8c00',
                      backgroundColor: '#ff8c00',
                    }}></View>
                  <Text style={{ color: '#ff8c00' }}>
                    {item.weight} <Text style={{ color: '#0096FF' }}>kg</Text>
                  </Text>
                </View>
              )}
            /> : <></>}
            <View>
              <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap:5,marginLeft:"auto"}}>
              <Text style={{ color: '#ff8c00' }}>Add</Text>
              <Ionicons name="add-circle-sharp" size={24} color="#ff8c00" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item: String) => item.id}
      />
    </SafeAreaView>
    </LinearGradient>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
    flex: 1,
  },
  workoutContainer: {
    borderRadius: 15,
    backgroundColor: Colors.light.blue,
    width: '100%',
    paddingHorizontal: 15,
    padding: 10,
    marginBottom: 10,
  },
});
export default createWorkout
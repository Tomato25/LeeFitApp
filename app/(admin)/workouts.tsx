import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { defaultStyles } from '@/constants/Styles'
import BookingTime from '@/components/BookingTIme'
import Picker from '@/components/Picker'

const workouts = () => {

  return (
    <View style={defaultStyles.container}>
    <LinearGradient
      colors={["#10123B", "#000000"]}
      style={[defaultStyles.background]}
    >
    <Picker />
    </LinearGradient>
  </View>
  )
}
export default workouts
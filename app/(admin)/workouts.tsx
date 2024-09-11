import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { defaultStyles } from '@/constants/Styles'
import BookingTime from '@/components/BookingTIme'

const workouts = () => {

  return (
    <View style={defaultStyles.container}>
    <LinearGradient
      colors={["#10123B", "#000000"]}
      style={[defaultStyles.background]}
    >
    
    </LinearGradient>
  </View>
  )
}
export default workouts
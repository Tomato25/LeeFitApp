import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { defaultStyles } from '@/constants/Styles'
import BookingTime from '@/components/BookingTIme'
import { collection, onSnapshot } from '@firebase/firestore'
import { db } from '@/firebaseConfig'

const booking = () => {

  const [users, setUsers] = useState<any[]>([])


  useEffect(() => {
    const usersRef = collection(db, "users")
    
    const userData = onSnapshot(usersRef, {
      next: (snapshot) => {
        const users: any[] = [];
        snapshot.docs.forEach(doc => {
          users.push({
            id: doc.id,
            ...doc.data()
          })
        })
        setUsers(users)
        console.log(users)
      }
    })
    
    }, [])
  
   



  return (
    <View style={defaultStyles.container}>
    <LinearGradient
      colors={["#10123B", "#000000"]}
      style={[defaultStyles.background]}
    >
    <BookingTime /> 
    </LinearGradient>
  </View>
  )
}
export default booking
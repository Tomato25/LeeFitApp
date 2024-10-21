import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCXg9Ezo4BjrZ4pdjAcPwtJhym6ghZL2-c",
    authDomain: "leefit-bd7cf.firebaseapp.com",
    projectId: "leefit-bd7cf",
    storageBucket: "leefit-bd7cf.appspot.com",
    messagingSenderId: "48061439103",
    appId: "1:48061439103:web:dd8d490d02547ad19cf34a",
    measurementId: "G-PMTHC2VDLN"
};
 const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})
 
export const db = getFirestore(app)
export const storage = getStorage(app);

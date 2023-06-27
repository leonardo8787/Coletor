import { getReactNativePersistence, initializeAuth } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {firebaseConfig} from '../../constants/firebase'
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const app       = initializeApp(firebaseConfig);

const Auth      = initializeAuth(app, {persistence: getReactNativePersistence(AsyncStorage)});   
const Firestore = getFirestore(app);
const Storage   = getStorage(app);

export {Firestore, Auth, Storage};
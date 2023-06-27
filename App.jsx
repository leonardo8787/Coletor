import React, { useEffect } from 'react';
import { useFonts, Montserrat_700Bold, Montserrat_300Light, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { AppRegistry } from 'react-native';
import { ColetorProvider } from './src/contexts/coletor';
import { Routes } from './src/routes/index';
import { getFirestore, collection, onSnapshot, addDoc, firebaseApp, firebase } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

const App = () => {
  const [fontLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <ColetorProvider>
      <Routes />
    </ColetorProvider>
  );
};

AppRegistry.registerComponent('RECICLE++', () => App);

export default App;

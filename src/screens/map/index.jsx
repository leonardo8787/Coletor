import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { View } from 'react-native';
import { styles, customMapStyle } from './style';
import * as Location from 'expo-location';
import { SimpleIcon } from '../../components/icons';
import { Colors, Theme } from '../../constants/setting';

function Map() {
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121
    });
  }

  useEffect(() => {
    userLocation();
  }, []);


  return (
      <View style={styles.container}>
        <MapView 
          style={styles.map} 
          region={location}
          customMapStyle={customMapStyle}
        >
          {/* <Marker 
            coordinate={location} 
            title='Marker' 
            description='Description'
            pinColor={'green'}
          /> */}
          <Marker 
            coordinate={location} 
            title='Posição' 
            description='Posição atual'
            pinColor={'green'}
          >
            <SimpleIcon name='circle-slice-8' size={30} color={Colors[Theme][2]} />
          </Marker>
        </MapView>
        
      </View>
  );
}

export { Map };

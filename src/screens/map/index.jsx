import React, {useState, useEffect} from 'react';
import MapView, {Marker, Circle} from 'react-native-maps';
import { View } from 'react-native';
import { styles, customMapStyle } from './style';
import * as Location from 'expo-location';
import { SimpleIcon } from '../../components/icons';
import { Colors, Theme } from '../../constants/setting';
import { RecyclableCard } from './components/recyclable_card';
import { GetRecyclable } from "../../firebase/providers/recyclable"
import { Loading } from '../../components/loading';
import { Error } from '../../components/error';
import { ButtonIcon } from '../../components/buttons';

function Map() {

  const [location, setLocation] = useState({
    latitude: -22.004313,
    longitude: -47.896467,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  });

  const [recyclable, setRecyclable]               = useState({});
  const [error, setError]                         = useState(false);
  const [addRecyclable, setAddRecyclable]         = useState(false);
  const [listRecyclable, setListRecyclable]       = useState(false);
  const [currentRecyclable, setCurrentRecyclable] = useState({});
  const [loading, setLoading]                     = useState(false);
  
  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    // setLocation({
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    //   latitudeDelta: 0.015,
    //   longitudeDelta: 0.0121
    // });
  }

  useEffect(() => {
    userLocation();
    GetRecyclable(setRecyclable);
  }, []);

  useEffect(() => {
    console.log(typeof recyclable);
    console.log(recyclable);
  }, [recyclable]);

  useEffect(() => {
    //setAddRecyclable(true);
  }, [addRecyclable]);


  return (
    <View style={styles.container}>

        {loading && <Loading />}
        {error && <Error error={error} closeFunc={()=>setError(false)}/>}
        {addRecyclable && <RecyclableCard data={currentRecyclable} closeCard={()=>setAddRecyclable(false)} setloading={(val)=>setLoading(val)}/>}

        <MapView 
          style={styles.map} 
          region={location}
          customMapStyle={customMapStyle}
        >
          <Marker 
            coordinate={location} 
            anchor={{ x: 0.5, y: 0.5 }}
            title='Estou aqui' 
            description='Posição atual'
            pinColor={'green'}
          >
            <SimpleIcon name='circle-slice-8' size={30} color={"#3FA28B"} />
          </Marker>
          <Circle
            center={location}
            radius={150}
            fillColor="rgba(0, 255, 196, 0.10)" // Cor do círculo (azul claro com transparência)
            strokeColor="rgba(0, 181, 136, 0.5)" // Cor da borda do círculo (azul com transparência)
            strokeWidth={1} // Espessura da borda do círculo
          />

          {
            recyclable && Object.entries(recyclable).map(([index, item]) => {
              return (
                <Marker
                  coordinate={{latitude: item["address"].latitude, longitude: item["address"].longitude}}
                  key={index}
                  onPress={()=>{
                    if(item["status"] == "pending"){
                      setCurrentRecyclable({
                        id: index,
                        ...item
                      });
                      setAddRecyclable(true);
                    }else{
                      setError({
                        title: "Indisponível",
                        content: "Esta coleta já foi selecionada por outro coletor."
                      });
                    }
                    
                  }}
                >
                  <SimpleIcon 
                    name={item["status"] == "pending" ? 'map-marker-account' : 'map-marker-alert'} 
                    size={40} color={item["status"] == "pending" ? '#0bbae3' : '#faa05e'} 
                  />

                </Marker>
              )
            })
          }
        </MapView>
        
        <View style={styles.floatButton}>
          <ButtonIcon
            btn={true} 
            name={"menu"}
            size={35}
            color={Colors[Theme][4]}
          />
        </View>
      </View>
  );
}

export { Map };

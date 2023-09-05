import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Styles } from './style';
import { TextBold, TextIcon, TextSimple } from '../../../components/texts';
import { Size20, Size28, Height, Width } from '../../../constants/scales';
import { ButtonDefault, ButtonIcon } from '../../../components/buttons';
import { useEffect, useState } from 'react';
import { Colors, Theme } from '../../../constants/setting';
import * as Linking from "expo-linking";
import { TokenizaConverterParaKg, TokenizarStringEmIntervalos } from '../../../utils/tokenizefunctions';
import { ImageCircleDefault } from '../../../components/images';
import { http } from '../../../utils/serviceOSRM';

export const RecyclableList = ({ datas, collector, closeList, showRecyclable, currentLocation, setLoading, setError}) => {

    const [myRecyclables, setMyRecyclables] = useState([]);
    const [contTime, setContTime] = useState(0); 
    const [kilo, setKilo] = useState(0);

    useEffect(() => {
        let domain;
        const hour = new Date().getHours();
        
        setMyRecyclables([]);
        setKilo(0);

        Object.entries(datas).map(([index, item]) => {    
            domain = false;
            if(item.collector.id == collector.id){
                TokenizarStringEmIntervalos(item.times).forEach((time) => {
                    if (time.inicio < hour && time.fim > hour || true) {
                        domain = true;
                        setContTime((old) => old + 1);
                        setKilo((old) => old + TokenizaConverterParaKg(item.weight));
                    } 
                })
                setMyRecyclables((old) => [...old, {index, item, domain}] );
            }
        });

    },[datas]);

    // useEffect(() => {
    //     console.log(myRecyclables);
    // },[myRecyclables]);

    async function generateRoute(){
        setLoading(true);

        // Get coordinates of all markers
        let coords = myRecyclables.map((marker) => {
            if (marker.domain){
                return [
                    marker.item.address.longitude,
                    marker.item.address.latitude,
                ];
            }
            return null;
        });
    
        // Add current location to beginning of array
        coords.unshift([currentLocation.longitude, currentLocation.latitude]);
    
        // Stringify coordinates to be used in OSRM API
        const coordsString = coords.map((coord) => coord.join(",")).join(";");
    
        // OSRM API request
        console.log("Coords:", coords);
        try{
            let res = await http.get(`trip/v1/car/${coordsString}?annotations=false`);

            // Get waypoints from response and sort them by waypoint_index
            const sortedWaypoints = await res.data.waypoints.sort(
            (a, b) => a.waypoint_index - b.waypoint_index
            );
    
            // Get only the coordinates of the sorted waypoints and reverse them(lnglat to latlng)
            const sortedCoords = await sortedWaypoints.map((coord) =>
            coord.location.reverse()
            );
    
            // Set origin and destination
            const origin = sortedCoords[0];
            const destination = sortedCoords[sortedCoords.length - 1];
    
            // Build Google Maps URL only with origin and destination
            let finalUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving&dir_action=navigate`;
    
            // If there are more than 2 waypoints, add them to the URL
            if (sortedCoords.length > 2) {
            // Remove origin and destination from sortedCoords
            sortedCoords.pop();
            sortedCoords.shift();
    
            // Prepare waypoints for Google Maps URL
            const waypoints = sortedCoords
                .map((coord) => coord.join(","))
                .join("|");
    
            // Add waypoints to Google Maps URL
            finalUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&waypoints=${waypoints}&destination=${destination}&travelmode=driving&dir_action=navigate`;
            }
    
            // Open Google Maps with sorted route
            Linking.openURL(finalUrl);
            
        }catch(err){
            setError({
                title: "Rota - " + err.code,
                content: "Não foi possível gerar a rota! \n" + err.message
            });
        }
        setLoading(false);
    };
   
    return (
        <View style={{...Styles.default, ...Styles.listIndex}}>
            <TouchableOpacity style={{...Styles.container_card, ...Styles.default, ...Styles.listIndex}} onPress={closeList}></TouchableOpacity>
            <View style={{...Styles.card, maxHeight:Height*0.8, ...Styles.listIndex}}>

                <View style={Styles.row}>
                    <TextBold content={"Lista de Coletas"} size={Size20}/>
                    <ButtonIcon name={"close"} fun={closeList} btn={true} size={Size28} color={Colors[Theme][5]}/>
                </View>

                {myRecyclables.length == 0 && <View style={{marginHorizontal: 20, marginTop: 10, marginBottom: 30}}> 
                    <TextSimple content={"Você não tem nenhuma coleta pendente!"} size={Size20}/>
                </View>}
                
                {myRecyclables.length > 0 && <View style={{marginTop: 20, marginBottom: 20}}> 
                    <ScrollView>
                        {myRecyclables.map((collect) => {
                            return (
                                <TouchableOpacity 
                                    key={collect.index} 
                                    style={{borderRadius:5, borderWidth:0.1, padding: 5, opacity: collect.domain ? 1 : 0.5, marginBottom: 10}}
                                    onPress={() => showRecyclable({'id': collect.index, ...collect.item})}
                                >
                                    <View style={{...Styles.row, justifyContent: "flex-start"}}>
                                        <View style={{alignItems:'center', width:"35%", marginRight: 10}}>
                                            <ImageCircleDefault img={{uri: collect.item.donor.photoUrl}} size={40} />
                                            <TextSimple content={collect.item.donor.name} size={Size20*0.7} />
                                        </View>
                                        <View style={{width:"60%", marginRight: 10}}>
                                            <TextIcon
                                                icon={"sign-direction"}
                                                color={Colors[Theme][4]}
                                                size={Size20*0.8}
                                                space={5}
                                            >
                                                {collect.item.address.street}, {collect.item.address.num}.
                                            </TextIcon>
                                            <TextIcon
                                                icon={"map-marker"}
                                                color={Colors[Theme][4]}
                                                size={Size20*0.8}
                                                space={5}
                                            >
                                                {collect.item.address.city}, {collect.item.address.state}.
                                            </TextIcon>
                                            <View style={{alignItems: "center"}}>

                                                <TextSimple content={collect.item.types} size={Size20*0.65} />
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>

                    <View style={{...Styles.row}}> 
                        <TextSimple content={kilo + " Kg"} size={Size20}/>
                        <ButtonDefault 
                            title={"Gerar Rota"} 
                            width={0.45}
                            textSize={Size20}
                            padding={7}
                            radius={8}
                            fun={() => {
                            if (contTime > 1) generateRoute();
                            else
                                setError({
                                    title: "Rota",
                                    content: "É necessário que haja pelo menos 2 coletas disponíveis no momento!"
                                })
                            }}
                        />
                    </View>
                </View>}
            </View>
        </View>
    );
};
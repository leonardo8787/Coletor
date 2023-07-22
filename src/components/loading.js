import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
import { Size50, Size20 } from "../constants/scales";
import { Colors, Theme } from "../constants/setting";

export const Loading = ({message = 'Carregando'}) => {
    return(
        <View style={Style.container}>
            <ActivityIndicator size={Size50*1.3} color={Colors[Theme][1]}/>
            <Text style={Style.text}>{message}</Text>
        </View>
    );
}

const Style = StyleSheet.create({
    container:{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        elevation: 1,
        zIndex: 3,
        backgroundColor: Colors[Theme][4],
        opacity: 0.5,
        alignItems:"center",
        justifyContent: "center"
    },
    
    text: {
        color: Colors[Theme][1],
        marginTop: Size20,
        fontSize: Size20,
        fontWeight: "900"
    }
})
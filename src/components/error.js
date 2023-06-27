import {View, StyleSheet, TouchableOpacity} from "react-native";
import { Size20, Width } from "../constants/scales";
import { Colors, Theme } from "../constants/setting";
import { ButtonDefault } from "./buttons";
import { TitleColorSmall } from "./titles";
import { TextSimple } from "./texts";
import { SizedBox } from "sizedbox"
import { useState } from "react";

export const Error = ({error, closeFunc}) => {
    return(
        <View style={Style.default}>
            <TouchableOpacity style={{...Style.default, ...Style.container}} onPress={closeFunc}></TouchableOpacity>
            <View style={Style.subcontainer}>
                <TitleColorSmall content={error.title}/>
                <TextSimple content={error.content}/>
                <SizedBox vertical={15}/>
                <ButtonDefault
                    title={"Confirmar"}
                    padding={5}
                    width={0.45}
                    color={Colors[Theme][2]}
                    textColor={Colors[Theme][1]}
                    radius={16}
                    textSize={Size20}
                    fun={closeFunc}
                />
            </View>
        </View>
    );
}

const Style = StyleSheet.create({
    default: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        elevation: 1,
        zIndex: 1,
        justifyContent: "center"
    },

    container:{  
        backgroundColor: Colors[Theme][4],
        opacity: 0.3,
        alignItems:"center",
    },
    
    subcontainer:{
        position: "absolute",
        elevation: 1,
        zIndex: 1,
        width: Width*0.9,
        //height: Height * 0.4,
        backgroundColor: Colors[Theme][1],
        alignSelf: "center",
        borderRadius: 10,
        padding: 20,
        alignItems: "center"
    },
})
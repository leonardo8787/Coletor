import { View, StyleSheet, Image } from "react-native";
import { Height } from "../constants/scales";
import { ButtonIcon } from "./buttons";
import { Colors, Theme } from "../constants/setting";

export const ImageCircle = ({
    size = Height*0.16,                 // Tamanho da imagem
    img = "",                           // Caminho da imagem
    top = Height*0.093,                 // posição em relação ao topo da imagem
    align = "center",                   // Alinhamento horizontal
    bgColor = Colors[Theme][7]          // Cor das bordas do componente
}) => {
    return (
        <View style={{...Styles.circleContainer, top: top, alignSelf: align, backgroundColor: bgColor}}>
            <Image style={{...Styles.circleImage, height:size, width:size}} source={img} alt="Imagem de Perfil" />
        </View>
    );
}

export const ImageCircleDefault = ({
    size = Height*0.16,                 // Tamanho da imagem
    img = "",                           // Caminho da imagem
}) => {
    return (
        <Image style={{...Styles.circleImage, height:size, width:size}} source={img} alt="Imagem de Perfil" />
    );
}

export const ImageCircleIcon = ({
    size = Height*0.16,                 // Tamanho da imagem
    img = "",                           // Caminho da imagem
    top = Height*0.093,                 // posição em relação ao topo da imagem
    align = "center",                   // Alinhamento horizontal
    icon = "",                          // Icone a ser adicionado
    fun = null,                         // Função que será executada a cada click no botão
    color,                              // Cor que o icone terá
    sizeIcon = 25,                      // Tamanho do icone
    bgColor = Colors[Theme][7]          // Cor das bordas do componente
}) => {
    return (
        <View style={{...Styles.circleContainer, top: top, alignSelf: align, backgroundColor: bgColor}}>
            <Image style={{...Styles.circleImage, height:size, width:size}} source={img} alt="Imagem de Perfil" />
            <View style={{...Styles.circleContainer, ...Styles.circleIcon, backgroundColor: bgColor}}>
                <ButtonIcon name={icon} color={color} size={sizeIcon} btn={true} fun={fun}/>
            </View>
        </View>
    );
}

export const ImageCircleHome = ({
    size = Height*0.16,
    img = "",
    top = Height*0.093,
    align = "flex-start"
}) => {
    return (
        <View style={{...Styles.circleContainer, height:size, width:size, top: top, alignSelf: align}}>
            <Image style={{...Styles.circleImage, height:size-8, width:size-8}} source={img} alt="Recicle++" />
        </View>
    );
}

const Styles = StyleSheet.create({
    circleContainer: {
        elevation: 0,
        zIndex: 1,
        marginLeft: 15,
        alignSelf:"center",
        position: "absolute",
        borderRadius: 100,
    },
    circleImage: {
        borderRadius: 100,
        margin: 4
    },
    circleIcon:{
        padding: 6,
        bottom: 0,
        left: 0
    }
})
import { Text, StyleSheet, View } from "react-native";
import { Colors, Theme } from "../constants/setting";
import { Size20, FontRegular, FontBold } from "../constants/scales";
import { SimpleIcon } from "./icons";

export const TextSimple = ({content, size = Size20}) => {
    return (
        <Text style={{...Style.textSimple, fontSize: size}}>{content}</Text>
    );
}
export const TextBold = ({content, size = Size20*0.8}) => {
    return (
        <Text style={{...Style.textBold, fontSize: size}}>{content}</Text>
    );
}
export const TextSimpleOpposite = ({
    content,
    alignH = "center",
}) => {
    return (
        <Text style={{...Style.textSimpleOpposite, alignSelf:alignH}}>{content}</Text>
    );
}

export const TextIcon = ({
    icon,
    color,
    size,
    space = 10,
    botton = 7,
    children
}) => {
    return (
        <View style={Style.row}> 
            <SimpleIcon
                name={icon}
                color={color}
                size={size*1.2}
                margin={0}
            />
            <Text style={{...Style.textIcon, color: color, fontSize: size, marginLeft: space, marginBottom: botton}}>
                {children}
            </Text>
        </View>
    )
}

const Style = StyleSheet.create({
    textSimple : {
        color: Colors[Theme][5],
        ...FontRegular
    },
    textBold : {
        color: Colors[Theme][5],
        ...FontBold
    },
    textIcon : {

    },
    row: {
        display: "flex",
        flexDirection:"row",
    },
    textSimpleOpposite : {
        color: Colors[Theme][7],
        fontSize: Size20*0.90,
        ...FontBold
    }
})
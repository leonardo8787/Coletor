import {StyleSheet} from 'react-native';
import {Colors, Theme} from '../../../constants/setting';

export const Styles = StyleSheet.create({
    cardIndex: {
        zIndex: 3,
    },
    listIndex: {
        zIndex: 2,
    },
    default: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        elevation: 1,
        alignItems:"center",
        justifyContent: "center"
    },
    container_card: {
        backgroundColor: Colors[Theme][4],
        opacity: 0.25,
    },
    content:{
        width: "100%",
        padding: 20,
        alignItems: "justify",
    },
    card: {
        position: "absolute",
        elevation: 1,
        width: "90%",
        backgroundColor: Colors[Theme][1],
        alignSelf: "center",
        borderRadius: 10,
        padding: 20,
        alignItems: "center"
    },
    row: {
        flexDirection:"row",
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
      },
})
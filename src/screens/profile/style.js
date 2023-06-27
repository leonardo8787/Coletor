import { StyleSheet } from "react-native";
import { Colors, Theme } from "../../constants/setting";
import { FontBold, Size20 } from "../../constants/scales";

export const Styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    containerEdit: {
      alignSelf:"center",
      alignContent: "center",
      alignItems: "center",
      marginTop:17
    },
    rowAdd: {
      flexDirection:"row",
      padding: 15,
      alignContent:"space-between",
      justifyContent: "space-between",
      marginTop: 10
    },
    row: {
      flexDirection:"row",
      alignContent:"space-between",
      justifyContent: "space-between",
    },

    titleAddress:{
      color: Colors[Theme][4],
      fontSize: Size20*1.3,
      ...FontBold
    }
  });
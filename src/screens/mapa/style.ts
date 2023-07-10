import { StyleSheet, Dimensions } from "react-native";
import { Width, Height, Size20, FontBold, FontRegular } from "../../constants/scales";
import { Colors, Theme } from "../../constants/setting";

const { width } = Dimensions.get('window');
const buttonWidth = width * 0.8;

export const styles = StyleSheet.create({
    card:{  
      alignSelf:"center",
      alignContent: "center",
      alignItems: "center",
      marginTop:17,
      elevation: 3,
      zIndex: 1,
      justifyContent: "center",
      width: Width * 0.85,
      borderRadius: 10,
      padding: 10,
      backgroundColor: Colors[Theme][1],
      //alignItems:"center",
      marginBottom: 15,
    },
    container: {
      flex: 1,
      alignItems: "center",
      padding: 24,
    },
    main: {
      flex: 1,
      justifyContent: "center",
      maxWidth: 960,
      marginHorizontal: "auto",
    },
    title: {
      fontSize: 64,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 36,
      color: "#38434D",
    },
    button: {
      backgroundColor: Colors[Theme][2],
      padding: 16,
      borderRadius: 8,
      width: buttonWidth,
      alignSelf: 'center',
    },
    text: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    card2: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 4,
      padding: 14,
      marginBottom: 14,
      width: width*0.9,
      alignSelf: 'center', 
    },    
    textCard: {
      fontSize: 16,
      color: 'black',
    },
    containerEdit: {
      alignSelf:"center",
      alignContent: "center",
      alignItems: "center",
      marginTop:17
    },
  });
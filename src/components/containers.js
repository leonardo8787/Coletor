import { Text, View, Image, StyleSheet } from "react-native";
import { Colors, Theme, Name } from "../constants/setting";
import { ButtonIcon, ButtonTextIcon } from "./buttons"
import { Size110, Size28, Height, FontBold, Size20, Width } from "../constants/scales"
import { TitleColor } from "./titles"
import { TextSimpleOpposite } from "./texts"

export const ContainerTop = () => {
  const img = require("../../assets/images/logo.png");
  return (
    <View style={styles.containerTop}>
        <Image style={styles.logo} source={img} alt="Recicle++" />
        <Text style={styles.textTop}>{Name}</Text>
    </View>
  );
};

export const ContainerTopRegister = () => {
  return (
    <View style={styles.containerTop2}>
      <View style={styles.outerBar}>
        <View style={styles.innerBar} />
      </View>
    </View>
  );
};

export const ContainerTopRegister2 = () => {
  return (
    <View style={styles.containerTop2}>
      <View style={styles.outerBar}>
        <View style={styles.innerBar2} />
      </View>
    </View>
  );
};

export const ContainerTopRegister3 = () => {
  return (
    <View style={styles.containerTop2}>
      <View style={styles.outerBar}>
        <View style={styles.innerBar3} />
      </View>
    </View>
  );
};

export const ContainerTopRegister4 = () => {
  return (
    <View style={styles.containerTop2}>
      <View style={styles.outerBar}>
        <View style={styles.innerBar4} />
      </View>
    </View>
  );
};

export const ContainerTopClean = ({
  text     = "",
  icon     = "",
  iconTxt  = "", 
  fun      = null
}) => {
  return (
    <View style={styles.containerTopClean}>
      <View style={styles.containerTopCleanR}>
        {fun && 
          <ButtonTextIcon
            name={icon}
            iconTxt={iconTxt}
            color={Colors[Theme][7]}
            fun={fun}
          />  
        }
        <TextSimpleOpposite content={text}/>
      </View>
    </View>
  );
};

export const ContainerTopTitle = ({title}) => {
  return (
    <View style={{...styles.containerTopClean, alignItems:"center", justifyContent:"center"}}>
     <Text style={{...styles.textTop, fontSize: Size28*1.3}}>
        {title}
     </Text>
    </View>
  );
};

export const ContainerData = ({
    children,           // Componente filho do container
    title               // titulo da rotina do container
}) => {
  return (
    <View style={styles.containerData}>
      <TitleColor content={title}/>
      {children}
    </View>
  )
};

const styles = StyleSheet.create({
    containerTop: {
      height: Height * 0.3,
      backgroundColor: Colors[Theme][2],
      alignItems: "center",
      verticalAlign: "bottom",
      textAlignVertical: "bottom",
      paddingTop: Height * 0.05
    },
    containerTop2: {
      height: Height * 0.1,
      backgroundColor: Colors[Theme][2],
      alignItems: "center",
      verticalAlign: "bottom",
      textAlignVertical: "bottom",
      paddingTop: Height * 0.05
    },
    containerTopClean: {
      height: Height*0.2,
      padding: 20,
      backgroundColor: Colors[Theme][2],
    },
    containerTopCleanR: {
      top: 0,
      right: 0,
      bottom: 0,
      left: Width*0.3,
      position: "absolute",
      elevation: 0,
      zIndex: 1,
      justifyContent: "space-between",
      paddingRight: 20,
      paddingTop: 35,
      paddingBottom: 10,
      alignItems: "center",
    },

    containerData: {
      padding: Size28,
      backgroundColor: Colors[Theme][1],
      alignItems: "center",
      verticalAlign: "bottom",
      textAlignVertical: "bottom",
  },

  textTop: {
      paddingTop: Height * 0.02,
      color: Colors[Theme][7],
      fontSize: Size28,
      ...FontBold
  },
  textNormal: {
      paddingTop: Height * 0.02,
      color: Colors[Theme][7],
      fontSize: Size20,
      ...FontBold
  },
  logo: {
      margin: Height * 0.01,
      width: Size110,
      height: Size110,
    },

    
  textData: {
      alignSelf: "flex-start",
      color: Colors[Theme][6],
      marginBottom: Size28,
      fontSize: Size28,
      ...FontBold
  },  
  outerBar: {
    width: '70%',
    height: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  innerBar: {
    height: '100%',
    width: '30%',
    backgroundColor: Colors[Theme][2],
    borderRadius: 5,
  },
  innerBar2: {
    height: '100%',
    width: '60%',
    backgroundColor: Colors[Theme][2],
    borderRadius: 5,
  },
  innerBar3: {
    height: '100%',
    width: '90%',
    backgroundColor: Colors[Theme][2],
    borderRadius: 5,
  },
  innerBar4: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors[Theme][2],
    borderRadius: 5,
  },
});
import { View, Text, StyleSheet } from "react-native";
import { Colors, Theme } from "../../../constants/setting";
import { Width, Height, Size20, Size50, FontBold, FontRegular } from "../../../constants/scales";
import { ButtonIcon } from "../../../components/buttons";
import { TextIcon, TextSimple } from "../../../components/texts";
import { ImageCircleDefault } from "../../../components/images";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/FontAwesome';

export const AddressCard = ({address, editFn, removeFn}) => {

    return (
        <View style={Style.container}>
            <View style={Style.row}>
                <ButtonIcon 
                    btn = {true}
                    name={"minus"}
                    color={Colors[Theme][5]}
                    margin={0}
                    size={Size20*1.4}
                    fun={removeFn}
                    alignSelf="flex-start"
                />
                <Text style={Style.textTitle}>{address.title}</Text>
                <ButtonIcon 
                    btn = {true}
                    name={"pencil"}
                    color={Colors[Theme][5]}
                    margin={0}
                    size={Size20*1.2}
                    fun={editFn}
                    alignSelf="flex-start"
                />
            </View>

           
            <TextIcon
                icon={"map-marker"}
                color={Colors[Theme][4]}
                size={Size20*0.8}
                space={15}
            >
                {address.cep}.
            </TextIcon>
            <TextIcon
                icon={"sign-direction"}
                color={Colors[Theme][4]}
                size={Size20*0.8}
                space={15}
            >
                {address.city}, {address.state}.
            </TextIcon>
            <TextIcon
                icon={"home"}
                color={Colors[Theme][4]}
                size={Size20*0.8}
                space={15}
            >
                {address.street}, {address.num} {address.complement}.
            </TextIcon>
        </View>
    );
}

export const AddressCard2 = ({address, editFn, removeFn}) => {

    return (
        <View style={Style.container}>
            <View style={Style.row}>
                <Text style={Style.textTitle}>{address.title}</Text>
            </View>

           
            <TextIcon
                icon={"map-marker"}
                color={Colors[Theme][4]}
                size={Size20*0.8}
                space={15}
            >
                {address.cep}.
            </TextIcon>
            <TextIcon
                icon={"sign-direction"}
                color={Colors[Theme][4]}
                size={Size20*0.8}
                space={15}
            >
                {address.city}, {address.state}.
            </TextIcon>
            <TextIcon
                icon={"home"}
                color={Colors[Theme][4]}
                size={Size20*0.8}
                space={15}
            >
                {address.street}, {address.num} {address.complement}.
            </TextIcon>
        </View>
    );
}

export const CardHome = ({ tipo, caixas, coleta, endereco, observacao, peso, sacolas }) => {
    return (
      <View style={Style.container}>
        <View style={Style.row}>
        <Text style={Style.textTitle}>{tipo}</Text>
          <ImageCircleDefault
            img={{ uri: 'https://www.florence.edu.br/wp-content/uploads/2022/08/Imagem-Materia_Dia-do-Cachorro-600x400.png' }}
            size={Size50 * 1.5}
          />
        </View>
  
        <View style={Style.row2}> 
        <FontAwesomeIcon name="cube" size={15} color="black" />
        <TextIcon
          color={Colors[Theme][4]}
          size={Size20 * 0.8}
          space={15}
        >
          {caixas}.
        </TextIcon>
        </View>
        <View style={Style.row2}> 
        <FontAwesomeIcon name="shopping-bag" size={15} color="black" />
        <TextIcon
          color={Colors[Theme][4]}
          size={Size20 * 0.8}
          space={15}
        >
          {sacolas}.
        </TextIcon>
        </View>
        <View style={Style.row2}> 
        <FontAwesomeIcon name="balance-scale" size={15} color="black" />
        <TextIcon
          color={Colors[Theme][4]}
          size={Size20 * 0.8}
          space={15}
        >
          {peso}.
        </TextIcon>
        </View>
        <TextIcon
          icon={"home"}
          color={Colors[Theme][4]}
          size={Size20 * 0.8}
          space={15}
        >
          {endereco}.
        </TextIcon>
        <View style={Style.row2}> 
        <FontAwesomeIcon name="circle" size={15} color="black" />
        <TextIcon
          color={Colors[Theme][4]}
          size={Size20 * 0.8}
          space={15}
        >
          {"Status: Em andamento"}.
        </TextIcon>
        </View>
      </View>

    );
  }
  

const Style = StyleSheet.create({
    row:{
        display: "flex",
        flexDirection:"row",        
        justifyContent:"space-between",        
    },

    row2:{
        display: "flex",
        flexDirection:"row",        
        // justifyContent:"space-between",        
    },

    textTitle : {
        marginBottom: 15,
        color: Colors[Theme][5],
        fontSize: Size20 * 0.85,
        ...FontBold
    },

    textContent : {

    },

    container:{  
        elevation: 3,
        zIndex: 1,
        justifyContent: "center",
        width: Width * 0.85,
        borderRadius: 10,
        padding: 10,
        backgroundColor: Colors[Theme][1],
        //alignItems:"center",
        marginBottom: 15
    },
})
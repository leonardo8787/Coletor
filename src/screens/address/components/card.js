import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Theme } from "../../../constants/setting";
import { Width, Height, Size20, Size50, FontBold, FontRegular } from "../../../constants/scales";
import { ButtonIcon } from "../../../components/buttons";
import { TextIcon, TextSimple } from "../../../components/texts";
import { ImageCircleDefault } from "../../../components/images";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

export const CardHome = ({ tipo, caixas, coleta, endereco, observacao, peso, sacolas, user, foto, nome, id }) => {
  const navigation = useNavigation();
      return (
        <View style={Style.container}>
          <View style={Style.row}>
            <View style={Style.container2}>
              <TextIcon
                  icon={"map-marker"}
                  color={Colors[Theme][4]}
                  size={Size20*0.8}
                  space={15}
              >
                  {endereco}.
              </TextIcon>
              <TextIcon
                  icon={"check"}
                  color={Colors[Theme][4]}
                  size={Size20*0.8}
                  space={15}
              >
                  {"Andamento"}.
              </TextIcon>
              <View style={Style.buttonGreey}>
                <TouchableOpacity style={Style.button2} onPress={() => navigation.navigate('Chat', { userId: id, userPhotoUrl: foto, userName: nome })}>
                  <MaterialCommunityIcons name="chat" size={25} color="white" />
                  <Text style={Style.text}>Chat</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
            <ImageCircleDefault
             img={{ uri: foto }}
             size={Size50 * 1.5}
           />
           <Text>{nome}</Text>
            </View>

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

    row2: {
      flexDirection: "row",
      justifyContent: "center",
    },  

    textTitle : {
        marginBottom: 15,
        color: Colors[Theme][5],
        fontSize: Size20 * 0.85,
        ...FontBold
    },

    text : {
      marginBottom: 0.00001,
      color: 'white',
      fontSize: Size20 * 0.85,
      ...FontBold
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

    container2:{  
      // elevation: 3,
      zIndex: 1,
      justifyContent: "center",
      width: Width * 0.5,
      // borderRadius: 10,
      padding: 10,
      backgroundColor: Colors[Theme][1],
      //alignItems:"center",
      marginBottom: 15
  },

    containerButtonClearandEdit: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row', // Para alinhar os botões lado a lado
    },
    button2: {
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: 200,
      flexDirection: "row",
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonGreey: {
      backgroundColor: '#CCCCCC',
      borderRadius: 20,
      paddingVertical: 0.1,
      paddingHorizontal: 45,
      justifyContent: 'center',
      alignItems: 'center',
      width: '45%',
    },
    buttonRed: {
      backgroundColor: '#FF3E3E',
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
      width: '35%',
    },
})
import { View , Text , StyleSheet, TextInput} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { ButtonIcon } from "./buttons"

import { Colors, Theme } from "../constants/setting";
import { Width, FontRegular, Size14 } from "../constants/scales";
import { useState } from "react";

export const InputIcon = ({
    onChange = null ,               // Função que salva o valor digitado na variável referênciada
    onBlur = null,                  // Função que executa quando o objeto receber foco
    value = null,                   // Variavel de relação do input
    label,                          // Label do input
    keyboardType = "default",       // Estilo de Teclado
    placeholder = null,             // Mensagem indutiva da escrita
    flexS = 0.83,                   // Porcentagem horizontal em relação ao tamanho da tela (0 - 1)
    icon,                           // Nome de Icone a ser inserido
    btn = false,                    // Define se o icone será um botão (esconde ou exibe o caractere)
    errorMsg = null,                // Mensagem de erro caso haja
    msg = "",                       // Mensagem adicional de sugestão
    cb = null,                      // Função de call-back
    enable = undefined              // Verifica se a edição está sendo permitida ou não
}) => {

    const [showTxt, setShowTxt] = useState(btn);
    const showTextChange = () => {
        setShowTxt(last => !last);
        cb(showTxt);
    }

    return (
        <View style={{width: Width * flexS}}>
        <Text style={{...styles.textLabel, color: errorMsg ? Colors[Theme][8] : Colors[Theme][6]}}>{label}</Text>
        <View style={{...styles.viewContainer, borderColor: errorMsg ? Colors[Theme][8] : Colors[Theme][5] }}>
            <TextInput 
                editable={enable}
                style = {styles.inputStyle}
                onChangeText={onChange}
                type="custom"
                onBlur={onBlur}
                value={value}
                placeholder={placeholder}
                aria-label="Nome"
                secureTextEntry={showTxt}
                cursorColor={Colors[Theme][3]}
                placeholderTextColor={Colors[Theme][5]}
                keyboardType= {keyboardType}
                
            />
            <ButtonIcon
                btn = {btn} 
                fun = {showTextChange} 
                name = {icon} 
                color = {Colors[Theme][5]} 
                size = {20} 
                margin = {0}
            />
    </View>
    {msg && <Text style={styles.textMsg}>{msg}</Text>}
    <Text style={styles.textError}>{errorMsg}</Text>
    </View>
    );
}

export const InputIconMask = ({
    onChange = null ,               // Função que salva o valor digitado na variável referênciada
    onBlur = null,                  // Função que executa quando o objeto perder foco
    value = null,                   // Variavel de relação do input
    label,                          // Label do input
    keyboardType = "default",       // Estilo de Teclado
    placeholder = null,             // Mensagem indutiva da escrita
    flexS = 0.83,                   // Porcentagem horizontal em relação ao tamanho da tela (0 - 1)
    icon,                           // Nome de Icone a ser inserido
    btn = false,                    // Define se o icone será um botão (esconde ou exibe o caractere)
    errorMsg = null,                // Mensagem de erro caso haja
    mask = undefined,               // Mascara a ser implementada no text
    msg = "",                       // Mensagem de recomendação de escrita
    cb = null,                      // Função de call-back
    enable = undefined              // Verifica se a edição está sendo permitida ou não
}) => {

    const [showTxt, setShowTxt] = useState(btn);
    const showTextChange = () => {
        setShowTxt(last => !last);
        cb(showTxt);
    }

    return (
        <View style={{width: Width * flexS}}>
        <Text style={{...styles.textLabel, color: errorMsg ? Colors[Theme][8] : Colors[Theme][6]}}>{label}</Text>
        <View style={{...styles.viewContainer, borderColor: errorMsg ? Colors[Theme][8] : Colors[Theme][5] }}>
            <MaskedTextInput 
                editable = {enable}
                style = {styles.inputStyle}
                onChangeText= {onChange}
                type="custom"
                mask= {mask}
                onBlur={onBlur}
                value={value}
                placeholder={placeholder}
                aria-label="Nome"
                secureTextEntry={showTxt}
                cursorColor={Colors[Theme][3]}
                placeholderTextColor={Colors[Theme][5]}
                keyboardType= {keyboardType}
                
            />
            <ButtonIcon
                btn = {btn} 
                fun = {showTextChange} 
                name = {icon} 
                color = {Colors[Theme][5]} 
                size = {20} 
                margin = {0}
            />
    </View>
    {msg && <Text style={styles.textMsg}>{msg}</Text>}
    <Text style={styles.textError}>{errorMsg}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1, 
        ...FontRegular  
    },

    inputStyle: {
        flex: 1,
        color: Colors[Theme][4],
        borderColor: Colors[Theme][6]
    },
    textLabel:{
        alignSelf: "flex-start",
        marginBottom: 3,
        fontSize: Size14,
        ...FontRegular
    },
    textMsg:{
        alignSelf: "flex-start",
        marginBottom: 3,
        fontSize: Size14,
        color: Colors[Theme][4],
        opacity: 0.7,
        marginBottom: 1,
        ...FontRegular
    },

    textError:{
        
        alignSelf: "flex-start",
        color: Colors[Theme][8],
        marginTop: 2,
        marginBottom: 10, 
        ...FontRegular 
    }
})
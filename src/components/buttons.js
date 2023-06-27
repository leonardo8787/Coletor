import { Text, TouchableOpacity, View, Image } from "react-native";
import { Width, FontSemibold} from "../constants/scales";
import { Colors, Theme } from "../constants/setting";
import { Size28, Size20 } from "../constants/scales";
import { SimpleIcon } from "./icons";

const ButtonDefault = ({
    title,                              // Titulo do button
    textSize = Size28,                  // Tamanho do Texto
    width = 0.8,                        // Largura do button 0-1
    color = Colors[Theme][2],           // Cor principal do button
    textColor = Colors[Theme][1],       // Cor do Text
    padding = 12,                       // Padding padrão entre os textos 
    opacity = 1,                        // Define a opacidade do button
    radius = 0,                         // Circuferência do button
    fun = null                          // Função que será executada a cada click
}) => {
    return (
        <TouchableOpacity onPress={fun}>
            <View  style={{backgroundColor: color, opacity: opacity, width: Width*width, alignItems:"center", padding: padding, borderRadius: radius}}>
                <Text style={{color: textColor, fontSize: textSize, ...FontSemibold}}>{title}</Text>
            </View>
        </TouchableOpacity>
        
    );
}

const ButtonDefaultData = ({
    title,                              // Titulo do button
    textSize = Size28,                  // Tamanho do Texto
    width = 0.8,                        // Largura do button 0-1
    color = Colors[Theme][2],           // Cor principal do button
    textColor = Colors[Theme][1],       // Cor do Text
    padding = 12,                       // Padding padrão entre os textos 
    opacity = 1,                        // Define a opacidade do button
    radius = 0,                         // Circuferência do button
    fun = null                          // Função que será executada a cada click
}) => {
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('Collection')}>
            <View  style={{backgroundColor: color, opacity: opacity, width: Width*width, alignItems:"center", padding: padding, borderRadius: radius}}>
                <Text style={{color: textColor, fontSize: textSize, ...FontSemibold}}>{title}</Text>
            </View>
        </TouchableOpacity>
        
    );
}

const ButtonImage = ({
    imageSrc,            // SRC da imagem capturado pelo required
    height = 45,         // Altura da imagem
    width = 45,          // Largura da imagem
    fun = null           // Função que será executada a cada click
}) => {
      
    return (
        <TouchableOpacity onPress={fun}>
            <Image style={{width: width, height:height}}  source={imageSrc} alt="Recicle++" />
        </TouchableOpacity> 
    );
}

const ButtonTextIcon = ({
    fun = null,     // Função que será executada a cada click no botão
    name,           // Nome do icone a ser inserido
    iconTxt = "",   // Texto que ficará a frente do icon
    color,          // Cor que o icone terá
    size = 25,      // Tamanho do icone
    margin = 0,     // Margem que o icone terá
}) => {
    return (
        <TouchableOpacity onPress={fun} style={{alignSelf:"flex-end"}}>
            <View style={{flexDirection: "row"}}>
                <Text style={{marginRight: 15, color: color, fontSize: Size20*0.9}}>{iconTxt}</Text>
                <SimpleIcon name={name} size={size} color={color} margin={margin} />
            </View>
        </TouchableOpacity>
    );
   
    
}

const ButtonIcon = ({
    btn = false,    // Define se o botão do icone estará ativo ou não
    fun = null,     // Função que será executada a cada click no botão
    name,           // Nome do icone a ser inserido
    color,          // Cor que o icone terá
    size = 25,      // Tamanho do icone
    margin = 0,     // Margem que o icone terá
    alignSelf = "flex-end"
}) => {
    return (
        <TouchableOpacity onPress={fun} disabled = {!btn} style={{alignSelf: alignSelf}}>
            <SimpleIcon name={name} size={size} color={color} margin={margin} />
        </TouchableOpacity>        
    );
}

export {ButtonDefault, ButtonIcon, ButtonImage, ButtonTextIcon};

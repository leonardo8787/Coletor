import { View, Text, TouchableOpacity } from "react-native";
import { Styles } from "./style";
import { ImageCircleDefault } from "../../../components/images";
import { TextBold, TextSimple } from "../../../components/texts";
import { TextIcon } from "../../../components/texts";
import {Colors, Theme} from '../../../constants/setting';
import { Size20 } from "../../../constants/scales";
import { ButtonDefault } from "../../../components/buttons";

export const RecyclableCard = ({ data, closeCard, setloading, add = true }) => {
    function accept(){
        setloading(true);
        setTimeout(()=>{
            setloading(false);
            //closeCard();
        }, 2000);
    }

    return (
        <View style={Styles.default}>
            <TouchableOpacity style={{...Styles.container_card, ...Styles.default}} onPress={closeCard}></TouchableOpacity>

            <View style={Styles.card}>
                <View style={Styles.row}>
                    <ImageCircleDefault img={{uri: data.donor.photoUrl}} size={40} />
                    <TextBold content={data.donor.name} size={Size20}/>
                </View>

                <View style={Styles.content}>
                    <TextIcon
                        icon={"map-marker"}
                        color={Colors[Theme][4]}
                        size={Size20*0.8}
                        space={15}
                    >
                        {data.address.cep}.
                    </TextIcon>
                    <TextIcon
                        icon={"sign-direction"}
                        color={Colors[Theme][4]}
                        size={Size20*0.8}
                        space={15}
                    >
                        {data.address.city}, {data.address.state}.
                    </TextIcon>
                    <TextIcon
                        icon={"home"}
                        color={Colors[Theme][4]}
                        size={Size20*0.8}
                        space={15}
                    >
                        {data.address.street}, {data.address.num} {data.address.complement}.
                    </TextIcon>

                    <View style={{...Styles.row, marginTop:10}}>
                        <TextIcon
                            icon={"dropbox"}
                            color={Colors[Theme][4]}
                            size={Size20*0.8}
                            space={5}
                        >
                            {data.boxes}
                        </TextIcon>
                        <TextIcon
                            icon={"weight"}
                            color={Colors[Theme][4]}
                            size={Size20*0.8}
                            space={5}
                        >
                            {data.bags}
                        </TextIcon>
                        <TextIcon
                            icon={"toolbox-outline"}
                            color={Colors[Theme][4]}
                            size={Size20*0.8}
                            space={5}
                        >
                            {data.weight}
                        </TextIcon>
                    </View>
                </View>

                <TextSimple content={data.types}/>

                {add &&
                    <View style={{...Styles.row, marginTop:20}}>
                        <ButtonDefault 
                            title={"Cancelar"} 
                            width={0.33}
                            textSize={Size20}
                            color={Colors[Theme][5]}
                            padding={5}
                            radius={10}
                            fun={closeCard}
                        />
                        <ButtonDefault 
                            title={"Aceitar"} 
                            width={0.30}
                            textSize={Size20}
                            padding={5}
                            radius={10}
                            fun={accept}
                        />
                    </View>
                }
            </View>
           
        </View>
    );
}
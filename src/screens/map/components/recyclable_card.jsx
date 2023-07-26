import { View, Text, TouchableOpacity } from "react-native";
import { Styles } from "./style";
import { ImageCircleDefault } from "../../../components/images";
import { TextBold, TextSimple } from "../../../components/texts";
import { TextIcon } from "../../../components/texts";
import {Colors, Theme} from '../../../constants/setting';
import { Size20 } from "../../../constants/scales";
import { ButtonDefault } from "../../../components/buttons";
import { AssociateCollector, DisassociateCollector } from "../../../firebase/providers/recyclable";
import { set } from "firebase/database";

export const RecyclableCard = ({ data, collector, closeCard, setloading, callbackError}) => {

    const isMe = data.collector.id == collector.id;
    const time = new Date().getDay() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + " - " + new Date().getHours() + ":" + new Date().getMinutes();

    async function accept(){
        setloading(true);
        await AssociateCollector(collector.id, data.id, collector.name, collector.photoUrl, time, callbackError);
        setloading(false);
        closeCard();
    }

    async function exclude(){
        setloading(true);
        await DisassociateCollector(collector.id, data.id, callbackError);
        setloading(false);
        closeCard();
    }

    return (
        <View style={{...Styles.default, ...Styles.cardIndex}}>
            <TouchableOpacity style={{...Styles.container_card, ...Styles.default, ...Styles.cardIndex}} onPress={closeCard}></TouchableOpacity>

            <View style={{...Styles.card, ...Styles.cardIndex}}>
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
                <TextSimple content={data.times}/>
              
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
                        title={isMe ? "Excluir" : "Aceitar"} 
                        color={isMe ? Colors[Theme][8] : Colors[Theme][2]}
                        width={0.30}
                        textSize={Size20}
                        padding={5}
                        radius={10}
                        fun={isMe ? exclude : accept}
                    />
                </View>
                
            </View>
           
        </View>
    );
}
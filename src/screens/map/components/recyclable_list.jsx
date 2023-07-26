import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Styles } from './style';
import { TextBold, TextIcon, TextSimple } from '../../../components/texts';
import { Size20, Size28, Height, Width } from '../../../constants/scales';
import { ButtonDefault, ButtonIcon } from '../../../components/buttons';
import { useEffect, useState } from 'react';
import { Colors, Theme } from '../../../constants/setting';
import { TokenizarStringEmIntervalos } from '../../../utils/tokenizefunctions';
import { ImageCircleDefault } from '../../../components/images';

export const RecyclableList = ({ datas, collector, closeList, showRecyclable}) => {

    const [myRecyclables, setMyRecyclables] = useState([]);

    useEffect(() => {
        let domain;
        const hour = new Date().getHours();
        
        setMyRecyclables([]);
        Object.entries(datas).map(([index, item]) => {    
            domain = false;
            if(item.collector.id == collector.id){
                TokenizarStringEmIntervalos(item.times).forEach((time) => {
                    if (time.inicio < hour && time.fim > hour) domain = true;
                })
                setMyRecyclables((old) => [...old, {index, item, domain}] );
            }
        });

    },[datas]);

    // useEffect(() => {
    //     console.log("My Recyclables: ", myRecyclables)
    // },[myRecyclables]);

    function generateRoute(){};
   
    return (
        <View style={{...Styles.default, ...Styles.listIndex}}>
            <TouchableOpacity style={{...Styles.container_card, ...Styles.default, ...Styles.listIndex}} onPress={closeList}></TouchableOpacity>
            <View style={{...Styles.card, maxHeight:Height*0.8, ...Styles.listIndex}}>

                <View style={Styles.row}>
                    <TextBold content={"Lista de Coletas"} size={Size20}/>
                    <ButtonIcon name={"close"} fun={closeList} btn={true} size={Size28} color={Colors[Theme][5]}/>
                </View>

                {myRecyclables.length == 0 && <View style={{marginHorizontal: 20, marginTop: 10, marginBottom: 30}}> 
                    <TextSimple content={"Você não tem nenhuma coleta pendente!"} size={Size20}/>
                </View>}
                
                {myRecyclables.length > 0 && <View style={{marginHorizontal: 20, marginTop: 10}}> 
                    <ScrollView>
                        {myRecyclables.map((collect) => {
                            return (
                                <TouchableOpacity 
                                    key={collect.index} 
                                    style={{borderRadius:10, borderWidth:0.3, padding: 10, opacity: collect.domain ? 1 : 0.5}}
                                    onPress={() => showRecyclable({'id': collect.index, ...collect.item})}
                                >
                                    <View style={{...Styles.row, justifyContent: "flex-start"}}>
                                        <View style={{alignItems:'center', width:"25%", marginRight: 10}}>
                                            <ImageCircleDefault img={{uri: collect.item.donor.photoUrl}} size={40} />
                                            <TextSimple content={collect.item.donor.name} size={Size20*0.7} />
                                        </View>
                                        <View style={{width:"70%", marginRight: 10}}>
                                            <TextIcon
                                                icon={"sign-direction"}
                                                color={Colors[Theme][4]}
                                                size={Size20*0.8}
                                                space={5}
                                            >
                                                {collect.item.address.street}, {collect.item.address.num}.
                                            </TextIcon>
                                            <TextIcon
                                                icon={"map-marker"}
                                                color={Colors[Theme][4]}
                                                size={Size20*0.8}
                                                space={15}
                                            >
                                                {collect.item.address.city}, {collect.item.address.state}.
                                            </TextIcon>
                                            <View style={{alignItems: "center"}}>

                                                <TextSimple content={collect.item.types} size={Size20*0.65} />
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>

                    <ButtonDefault 
                        title={"Gerar Rota"} 
                        width={0.69}
                        textSize={Size20}
                        padding={7}
                        radius={8}
                        fun={generateRoute}
                    />
        
                </View>}
            </View>
        </View>
    );
};
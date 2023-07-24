import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Styles } from './style';
import { TextBold, TextSimple } from '../../../components/texts';
import { Size20, Size28 } from '../../../constants/scales';
import { ButtonDefault, ButtonIcon } from '../../../components/buttons';
import { useState } from 'react';
import { Colors, Theme } from '../../../constants/setting';

export const RecyclableList = ({ datas, closeList, setLoading }) => {

    const [myRecyclabes, setMyRecyclabes] = useState(["cs"]);

    return (
        <View style={Styles.default}>
            <TouchableOpacity style={{...Styles.container_card, ...Styles.default}} onPress={closeList}></TouchableOpacity>
            <View style={{...Styles.card, maxHeight:"85%"}}>

                <View style={Styles.row}>
                    <TextBold content={"Lista de Coletas"} size={Size20}/>
                    <ButtonIcon name={"close"} fun={closeList} btn={true} size={Size28} color={Colors[Theme][5]}/>
                </View>

                {myRecyclabes.length == 0 && <View style={{marginHorizontal: 20, marginTop: 10, marginBottom: 30}}> 
                    <TextSimple content={"Você não tem nenhuma coleta pendente!"} size={Size20}/>
                </View>}
                
                {myRecyclabes.length > 0 && <View style={{marginHorizontal: 20, marginTop: 10, marginBottom: 20}}> 
                    <ScrollView style={{marginBottom: 20}}>
                        {myRecyclabes.map((id) => {
                            return (
                                <TextSimple content={id} size={Size20} key={id}/>
                            );
                        })}
                    </ScrollView>

                    <ButtonDefault 
                        title={"Gerar Rota"} 
                        width={0.69}
                        textSize={Size20}
                        padding={7}
                        radius={8}
                    />
        
                </View>}
            </View>
        </View>
    );
};
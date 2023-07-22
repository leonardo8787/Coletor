import { View, TouchableOpacity } from 'react-native';
import { Styles } from './style';

export const RecyclybleList = ({ recyclables, closeList }) => {
    return (
        <View style={Styles.default}>
            <TouchableOpacity style={{...Styles.container_card, ...Styles.default}} onPress={closeList}></TouchableOpacity>
            <View style={Styles.default}></View>
        </View>
    );
};
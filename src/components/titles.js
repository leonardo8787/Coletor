import { Text, StyleSheet } from  'react-native';
import { FontBold, FontRegular, Size20, Size28 } from '../constants/scales';
import { Colors, Theme } from '../constants/setting';

export const TitleColor = ({content, align = "flex-start"}) => {
    return (    
        <Text style={{...Style.titleColor, ...Style.titleColorBig, alignSelf: align}}>
            {content}
        </Text>
    );
}

export const TitleColorSmall = ({content, align="flex-start"}) => {
    return (    
        <Text style={{...Style.titleColor, ...Style.titleColorSmall, alignSelf: align}}>
            {content}
        </Text>
    );
}

const Style = StyleSheet.create({
    titleColor: {
        alignSelf: "flex-start",
        color: Colors[Theme][6],
    },
    titleColorBig: {
        fontSize: Size28, 
        marginBottom: Size28,
        ...FontBold
    },
    titleColorSmall: {
        fontSize: Size20*1.2, 
        marginBottom: Size28 * 0.5,
        ...FontRegular
    }
})
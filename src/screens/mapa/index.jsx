import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export function Mapa({ route }) {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Mapa</Text>
        </View>
    );
}

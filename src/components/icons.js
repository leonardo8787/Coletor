import { MaterialCommunityIcons } from "@expo/vector-icons";

export const SimpleIcon = ({
    name,               // Nome do icone (ref)
    color,              // Cor do icone
    size = 20,          // Tamanho do icone
    margin = 0          // Margens do icone
}) => {
    return <MaterialCommunityIcons name={name} size={size} color={color} style={{margin}} />;
}


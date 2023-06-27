import { Dimensions, PixelRatio } from "react-native";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const scaleFont = (size: number) => size * PixelRatio.getFontScale();


// FONT FAMILY
const familyBold        = "Montserrat_700Bold";
const familyLight       = "Montserrat_300Light";
const familyRegular     = "Montserrat_400Regular";
const familySemibold    = "Montserrat_600SemiBold";

// FONT SIZE
const Size110   = scaleFont(110);
const Size50   = scaleFont(50);
const Size28    = scaleFont(28);
const Size20    = scaleFont(20);
const Size18    = scaleFont(18);
const Size16    = scaleFont(16);
const Size14    = scaleFont(14);
const Size12    = scaleFont(12);

// LINE HEIGHT
const LineHeight28  = scaleFont(30);
const LineHeight20  = scaleFont(20);
const LineHeight16  = scaleFont(16);

// FONT STYLE
const FontBold      = {letterSpacing: 0,        fontFamily: familyBold};
const FontLight     = {letterSpacing: 0,        fontFamily: familyLight};
const FontRegular   = {letterSpacing: -0.5,     fontFamily: familyRegular};
const FontSemibold  = {letterSpacing: 0,        fontFamily: familySemibold};

export {
    Width, 
    Height, 
    Size110,
    Size50,
    Size28, 
    Size20, 
    Size18, 
    Size16, 
    Size14, 
    Size12, 
    FontBold, 
    FontLight, 
    FontRegular, 
    FontSemibold,
    LineHeight28,
    LineHeight20,
    LineHeight16
};

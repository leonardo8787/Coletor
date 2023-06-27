import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import { useContext, useState, useEffect } from "react";
import { SizedBox } from 'sizedbox';

import { Size20, Size50, Size16, FontRegular } from "../../constants/scales";
import { ContainerTop, ContainerData } from "../../components/containers";
import { ButtonDefault, ButtonImage } from "../../components/buttons";
import { ColetorContext } from "../../contexts/coletor/context"
import { Colors,Theme } from "../../constants/setting";
import { InputIcon } from "../../components/inputs";
import * as Types from "../../contexts/coletor/types";
import { Loading } from "../../components/loading";
import { Error } from "../../components/error";
import { Styles } from "./style"

export function Login() {

  const {coletorState, coletorDispach} = useContext(ColetorContext)
  const [email, setEmail]          = useState("Coletorleo@coletor.com");
  const [pass, setPass]            = useState("Leonardo8787@");
  const [hide, setHide]            = useState(false);
  const navigation                 = useNavigation();

  const [emailErr, setEmailErr]    = useState("");
  const [passErr, setPassErr]      = useState("");
  const [loandding, setLoadding]   = useState(false);
  const [error, setError]          = useState(false);

  const img = require("../../../assets/images/googleLogo.png");

  function openScreen(){
    coletorDispach({type:Types.SETSIGNOUT});
    navigation.navigate('Sign');
  }

  function validation(){
    let valid = false;

    // if(Validation.emailValidation(coletorState.email)) {
    //   setEmailErr(Errors.emailErr);
    //   valid = true;
    // }

    // if(Validation.passValidation(pass)) {
    //   setPassErr(Errors.passErr);
    //   valid = true;
    // }

    return valid;
  }

  function login(){
    if(validation()) return false;
    setLoadding(true);
    coletorDispach({type: Types.LOGIN, payload: pass, dispatch: coletorDispach, cb:callback});
  }
  function callback(error){
    setLoadding(false);
    setError(error);
  }

  function loginWithGoogle(){
    //coletorDispach({type: Types.LOGINGOOGLE, dispatch: coletorDispach});
  }

  const handleChange = (value, type) => {
    coletorDispach({type: type, payload: value});
  }

  return (
    <View style={Styles.container}>
      {error && <Error error={error} closeFunc={() => setError(false)}/>}
      {loandding && <Loading/>}
      <ScrollView>
        <ContainerTop/>
        <ContainerData title={"Login"}>

            <InputIcon 
              onChange = {(value) => {handleChange(value, Types.SETEMAIL); setEmailErr("")}}
              value = {coletorState.email}
              placeholder = {"Digite seu email"}
              label = "Email"
              icon = "email-outline"
              errorMsg={emailErr}
            />

            <InputIcon 
              onChange = {(value) => {setPass(value); setPassErr("")}}
              value = {pass}
              placeholder = {"Digite sua senha"}
              label = "Senha"
              icon = {hide ? "eye-outline" : "eye-off-outline"}
              errorMsg={passErr}
              btn = {true}
              cb = {setHide}
            />  

            <SizedBox vertical={10} />

            <ButtonDefault
              title={"Entrar"}
              color={Colors[Theme][2]}
              textColor={Colors[Theme][7]}
              textSize={Size20}
              width={0.7}
              fun={login}
            />
            <SizedBox vertical={5} />
            <ButtonDefault
              title={"Cadastrar"}
              color={Colors[Theme][5]}
              textColor={Colors[Theme][7]}
              textSize={Size20}
              width={0.7}
              opacity={0.7}
              fun={openScreen}
            />
            <SizedBox vertical={Size20} />
            <Text style={{marginBottom: Size16, fontSize: Size16, color: Colors[Theme][5], ...FontRegular}}> Ou, fazer login com </Text>
            <ButtonImage 
              imageSrc = {img}
              width={Size50}
              height={Size50}
              fun={loginWithGoogle}
            />
        </ContainerData>
        
      </ScrollView>
    </View>
  );
}
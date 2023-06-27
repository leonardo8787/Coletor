import { useContext, useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { SizedBox } from 'sizedbox';

import { ContainerTop, ContainerData } from "../../components/containers";
import { InputIcon,InputIconMask } from "../../components/inputs";
import { ColetorContext } from "../../contexts/coletor/context";
import { ButtonDefault } from "../../components/buttons";
import { Colors,Theme } from "../../constants/setting";
import { Loading } from "../../components/loading";
import { Size20 } from "../../constants/scales";
import { Error } from "../../components/error";
import { Styles } from "./style";

import * as Validation from "../../utils/validation";
import * as Types from "../../contexts/coletor/types";
import * as Errors from "../../constants/erros";
import * as Mask from "../../utils/marksFormat";

export function Sign() {

  const {coletorState, coletorDispach} = useContext(ColetorContext)
  const [pass, setPass]            = useState("");
  const [hide, setHide]            = useState(false);
  const [loandding, setLoadding]   = useState(false);
  const [error, setError]          = useState(false);

  const [nameErr, setNameErr]   = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [passErr, setPassErr]   = useState("");
  // const [rgErr, setRgErr]       = useState("");
  // const [cpfErr, setCpfErr]     = useState("");

  useEffect(()=>{},[])

  function validation(){
    let valid = false;
    if(Validation.nameValidation(coletorState.name)) {
      setNameErr(Errors.nameErr);
      valid = true;
    }

    // if(Validation.rgValidation(coletorState.rg)) {
    //   setRgErr(Errors.rgErr);
    //   valid = true;
    // }

    // if(Validation.cpfValidation(coletorState.cpf)) {
    //   setCpfErr(Errors.cpfErr);
    //   valid = true;
    // }

    if(Validation.emailValidation(coletorState.email)) {
      setEmailErr(Errors.emailErr);
      valid = true;
    }

    if(Validation.phoneValidation(coletorState.phone)) {
      setPhoneErr(Errors.phoneErr);
      valid = true;
    }

    if(Validation.passValidation(pass)) {
      setPassErr(Errors.passErr);
      valid = true;
    }

    return valid;
  }

  function sign(){
    if(validation()) return false;
    setLoadding(true); 
    coletorDispach({type: Types.SIGN, payload: pass, dispatch: coletorDispach, cb:callback});
  }

  function callback(error){
    setLoadding(false);
    setError(error);
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
        <ContainerData title={"Cadastro"}>
            <InputIcon 
              onChange = {(value) => {handleChange(value, Types.SETNAME); setNameErr("")}}
              value = {coletorState.name}
              placeholder = {"Digite seu nome"}
              label = "Nome"
              icon = "account"
              errorMsg={nameErr}
            />

            {/* <InputIcon 
              onChange = {(value) => {handleChange(value, Types.SETRG); setRgErr("")}}
              value = {coletorState.rg}
              placeholder = {"Digite seu RG"}
              label = "RG"
              icon = "account"
              errorMsg={rgErr}
            />

            <InputIcon 
              onChange = {(value) => {handleChange(value, Types.SETCPF); setCpfErr("")}}
              value = {coletorState.cpf}
              placeholder = {"Digite seu CPF"}
              label = "CPF"
              icon = "account"
              errorMsg={cpfErr}
            /> */}

            <InputIconMask 
              onChange = {(value) => {handleChange(value, Types.SETPHONE); setPhoneErr("")}}
              value = {coletorState.phone}
              placeholder = {"Digite seu contato"}
              keyboardType={"number-pad"}
              label = "Contato"
              icon = "cellphone"
              mask={Mask.phoneMask}
              errorMsg={phoneErr}
            />

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
              msg="Caracteres: maiúsculos, minusculos, especiais e numericos são necessários"
              icon = {hide ? "eye-outline" : "eye-off-outline"}
              errorMsg={passErr}
              btn = {true}
              cb = {setHide}
            />  

            <SizedBox vertical={10} />

            <ButtonDefault
              title={"Cadastrar"}
              color={Colors[Theme][2]}
              textColor={Colors[Theme][7]}
              textSize={Size20}
              width={0.7}
              fun={sign}
            />      
        </ContainerData>       
      </ScrollView>
      
    </View>
  );
}

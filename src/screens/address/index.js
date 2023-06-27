import {View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { Height, Size20, Width } from "../../constants/scales";
import { Colors, Theme } from "../../constants/setting";
import { ButtonDefault } from "../../components/buttons";
import { TitleColorSmall } from "../../components/titles";
import { SizedBox } from "sizedbox";
import { InputIcon, InputIconMask } from "../../components/inputs";
import * as Mask from "../../utils/marksFormat";
import { cepValidation } from "../../utils/validation";
import { ColetorContext } from "../../contexts/coletor/context";
import { useEffect, useState, useContext } from "react";
import { Loading } from "../../components/loading";
import { Error } from "../../components/error";
import { UPDATEADDRESS, UPDATE } from "../../contexts/coletor/types"


export const RegisterAddress = ({data, dispach, closeFunc, idx = -1}) => {
    //const {data, dispach}                   = useContext(DonorContext);

    const [title, setTitle]                 = useState("");
    const [cep, setCep]                     = useState("");
    const [street, setStreet]               = useState("");
    const [num, setNum]                     = useState("");
    const [city, setCity]                   = useState("");
    const [state, setState]                 = useState("");
    const [neighborhood, setNeighborhood]   = useState("");
    const [complement, setComplement]       = useState("");

    const [head, setHead]                   = useState("Cadastro de Endereço")
    const [error, setError]                 = useState(false);
    const [loandding, setLoandding]         = useState(false);

    const [titleErr, setTitleErr]           = useState("");
    const [cepErr, setCepErr]               = useState("");
    const [streetErr, setStreetErr]         = useState("");
    const [numErr, setNumErr]               = useState("");
    const [cityErr, setCityErr]             = useState("");
    const [stateErr, setStateErr]           = useState("");

    useEffect(()=>{
        if(idx >= 0){
            setTitle(data.address[idx].title)
            setCep(data.address[idx].cep)
            setStreet(data.address[idx].street)
            setNum(data.address[idx].num)
            setNeighborhood(data.address[idx].neighborhood)
            setCity(data.address[idx].city)
            setState(data.address[idx].state)
            setComplement(data.address[idx].complement)
            setHead("Edição de Endereço")
        }
    },[]);

    function validation(){
        let res = true;
        const phase = "Campo Obrigatório"

        if(title  == ''){setTitleErr(phase);res = false;}
        if(street == ''){setStreetErr(phase); res = false;}
        if(num    == ''){setNumErr(phase); res = false;}
        if(state  == ''){setStateErr(phase); res = false;}
        if(city   == ''){setCityErr(phase); res = false;}
        if(cepValidation(cep)) {setCepErr("Cep inválido"); res = false;}

        return res;
    }

    function confimPressed(){
        if(validation()){
            let address = data.address;

            const newAddress = {
                'title' : title.trim(),
                'cep' : cep.trim(),
                'num' : num.trim(),
                'street' : street.trim(),
                'state' : state.trim(), 
                'city' : city.trim(),
                'neighborhood': neighborhood.trim(),
                'complement' : complement.trim()
            }
            if(idx >= 0){
                address[idx] = newAddress
            }else{
                address.push(newAddress);
            }

            dispach({type: UPDATEADDRESS, payload: address})
            dispach({type: UPDATE, data: {...data, 'address':address}, dispatch: dispach, cb:updateCB});
            closeFunc();
        }
    }
    function updateCB(status, err){
        if(status){setError(err)};  
        setLoandding(false); 
    }
    function apiCep(){
        const nCep = cep.replace(/[^0-9]/gi, "");
        return `https://viacep.com.br/ws/${nCep}/json/`;
    }
    function getCepInf(){
        apiCep();
        fetch(apiCep())
            .then((responseObj) => {
            responseObj.json()
                .then((data) => {
                    if(!data.erro){
                        setNeighborhood(data.bairro);
                        setCity(data.localidade);
                        setStreet(data.logradouro. substring(3));
                        setState(data.uf);
                    }
                });
        });
    }

    return(
        <View style={Style.default}>
            {error && <Error error={error} closeFunc={()=>setError(false)}/>}
            {loandding && <Loading/>}

            <TouchableOpacity style={{...Style.default, ...Style.container}} onPress={closeFunc}></TouchableOpacity>
            <View style={Style.subcontainer}>
                <ScrollView>

                    <TitleColorSmall align={"center"} content={head}/>
                    <SizedBox vertical={5}/>

                    <InputIcon 
                        onChange = {(value) => {setTitle(value), setTitleErr("")}}
                        value = {title}
                        placeholder = {"Digite o título"}
                        label = "Titulo *"
                        flexS={0.78}
                        errorMsg={titleErr}
                    />

                    <View style={Style.row}>
                        <InputIconMask 
                            onChange = {(value) => {setCep(value); setCepErr('')}}
                            value = {cep}
                            placeholder = {"Digite o CEP"}
                            keyboardType={"number-pad"}
                            label = "CEP *"
                            mask={Mask.cepMask}
                            flexS={0.4}
                            errorMsg={cepErr}
                            onBlur={getCepInf}
                        />
                        <InputIcon 
                            onChange = {(value) => {setNum(value);setNumErr('')}}
                            value = {num}
                            placeholder = {"Digite o Nº"}
                            keyboardType={"number-pad"}
                            label = "Nº Endereço *"
                            flexS={0.35}
                            errorMsg={numErr}
                        />
                    </View>

                    <InputIcon 
                        onChange = {(value) => {setStreet(value); setStreetErr('')}}
                        value = {street}
                        placeholder = {"Digite o nome da rua"}
                        label = "Rua *"
                        flexS={0.78}
                        errorMsg={streetErr}
                    />

                    <View style={Style.row}>
                        <InputIcon 
                            onChange = {(value) => {setState(value); setStateErr('')}}
                            value = {state}
                            placeholder = {"Nome do estado"}
                            label = "Estado *"
                            flexS={0.375}
                            errorMsg={stateErr}
                        />
                        <InputIcon 
                            onChange = {(value) => {setCity(value); setCityErr('')}}
                            value = {city}
                            placeholder = {"Nome da cidade"}
                            label = "Cidade *"
                            flexS={0.375}
                            errorMsg={cityErr}
                        />
                    </View>

                    <View style={Style.row}>
                       <InputIcon 
                            onChange = {setNeighborhood}
                            value = {neighborhood}
                            placeholder = {"Nome do bairro"}
                            label = "Bairro"
                            flexS={0.375}
                        />
                         <InputIcon 
                            onChange = {setComplement}
                            value = {complement}
                            placeholder = {"Ex: Ap. 621, Fundo."}
                            label = "Complemento"
                            flexS={0.375}
                        />
                    </View>

                    <SizedBox vertical={5}/>
                    <View style={Style.row}>
                        <ButtonDefault
                            title={"Cancelar"}
                            padding={5}
                            width={0.35}
                            color={Colors[Theme][8]}
                            textColor={Colors[Theme][1]}
                            radius={16}
                            textSize={Size20*0.9}
                            fun={closeFunc}
                        />
                        <ButtonDefault
                            title={"Confirmar"}
                            padding={5}
                            width={0.35}
                            color={Colors[Theme][2]}
                            textColor={Colors[Theme][1]}
                            radius={16}
                            textSize={Size20*0.9}
                            fun={confimPressed}
                        />
                    </View>
                </ScrollView>
                
            </View>
        </View>
    );
}

const Style = StyleSheet.create({
    default: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        elevation: 1,
        zIndex: 1,
        justifyContent: "center"
    },

    row:{
        width: Width*0.9-45,
        display: "flex",
        flexDirection:"row",
        justifyContent:"space-between",        
    },

    container:{  
        backgroundColor: Colors[Theme][4],
        opacity: 0.3,
        alignItems:"center",
    },
    
    subcontainer:{
        position: "absolute",
        elevation: 1,
        zIndex: 1,
        width: Width*0.9,
        maxHeight: Height*0.85,
        //height: Height * 0.4,
        backgroundColor: Colors[Theme][1],
        alignSelf: "center",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
})
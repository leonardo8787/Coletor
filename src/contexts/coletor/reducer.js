import * as Types from "./types";
import { coletor } from "./data";
import { Sign, Login, LoginWithGoogle, SignOut, UpDate, UploadImage } from "../../firebase/providers/coletor"


export const reducer = (state, action) => {
    switch(action.type){
        case Types.LOGIN: {
            Login({email: state.email, pass: action.payload}, action.dispatch, action.cb);
            return {...state};
        }
        case Types.LOGOUT: {
            SignOut(action.cb)
            return {...state};
        }
        case Types.SIGN: {
            Sign({...state, pass: action.payload}, action.dispatch, action.cb);
            return {...state};
        }
        case Types.LOGINGOOGLE: {
            LoginWithGoogle(action.dispatch);
            return {...state};
        }
        case Types.UPDATE: {
            UpDate(action.data, action.dispatch, action.cb);
            return {...state};
        }
        case Types.LOADIMAGE: {
            UploadImage({id: state.id, uri : action.uri}, action.cb);
            return{...state};
        }
        case Types.UPDATEADDRESS: {
            return{...state, address: action.payload};
        }
        case Types.ADDNOTIFICATION: {
            newNot = state.notifications
            newNot.push(action.payload)
            return{...state, notifications: newNot}
        }


        case Types.SETSIGNOUT: {
            return {...coletor, logged: false};
        }
        // case Types.SETRG: {
        //     return {...state, name: action.payload};
        // }
        // case Types.SETCPF: {
        //     return {...state, name: action.payload};
        // }
        case Types.SETNAME: {
            return {...state, name: action.payload};
        }
        case Types.SETEMAIL: {
            return {...state, email: action.payload};
        }
        case Types.SETPHONE: {
            return {...state, phone: action.payload};
        }
        case Types.SETLOGGED: {
            return {...state, ...action.payload, logged: true};
        }
        case Types.SETUPDATE: {
            return {...state, ...action.payload};
        }
        case Types.SETIMAGE: {
            console.log("PAYLOAD1: ",action.payload);
            return {...state, photoUrl: action.payload};
        }
        default: {
            console.log("Action não encontrada", action.type);
            return {...state};
        }
    }
}
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, getRedirectResult, signInWithRedirect, signOut } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

import { Firestore, Auth } from "../config/connection";
import { VerifyErroCode } from "../config/errors";
import * as Types from "../../contexts/coletor/types";

import { Storage } from "../config/connection";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

import P from 'prop-types';

async function Sign (data, dispach, callback) { 
  createUserWithEmailAndPassword(Auth, data.email, data.pass)
  .then(async (userCredential) => {  
    const user = userCredential.user; 

    delete data.pass;
    delete data.id;
    delete data.logged;
    try {
        await setDoc(doc(Firestore, "coletor", user.uid), data);
        dispach({type: Types.SETLOGGED, payload: {id: user.uid}});          
      } catch (err) {
        const error = {
          title: "Falha ao cadastrar",
          content: VerifyErroCode(err.code)
        }
        callback(error);
      }
  }).catch(err => {
    const error = {
      title: "Falha ao cadastrar",
      content: VerifyErroCode(err.code)
    }
    callback(error);
  });

}
Sign.propTypes = {
  data: P.instanceOf(Map).isRequired,
  dispach: P.func.isRequired
}

async function SignOut(callback){
  signOut(Auth).then(()=>{
    callback(true);
  }).catch((err) => {
    const error = {
      title: "Falha ao Sair",
      content: VerifyErroCode(err.code)
    }
    callback(false, error);
  })
}

async function UpDate(data, dispach, callback) {
  const id = data.id;
  
  delete data.pass;
  delete data.id;
  delete data.logged;

  setDoc(doc(Firestore, "coletor", id), data).then(()=>{
    dispach({type: Types.SETUPDATE, payload: data});  
    callback(false, null);
  }).catch((err)=>{
    const error = {
      title: "Falha ao atualizar dados",
      content: VerifyErroCode(err.code)
    }
    callback(true, error);
  });          
}

async function UpDateTokenNotification(id,token, callback) {
  updateDoc(doc(Firestore, "coletor", id), {pushTokenNotification: token}
  ).catch((err)=>{
    const error = {
      title: "Falha ao atualizar dados",
      content: VerifyErroCode(err.code)
    }
    callback(error);
  });          
}

async function UpDateNotificationList(id, notification, callback) {
  updateDoc(doc(Firestore, "coletor", id), {notifications: arrayUnion(notification)}
  ).catch((err)=>{
    const error = {
      title: "Falha ao atualizar dados",
      content: VerifyErroCode(err.code)
    }
    callback(error);
  });          
}

async function Login(data, dispach, callback) {
  signInWithEmailAndPassword(Auth, data.email, data.pass)
  .then(async (userCredential) => {
    const ref  = userCredential.user;
    const user = await getDoc(doc(Firestore, 'coletor', ref.uid));
    dispach({type: Types.SETLOGGED, payload: {...user.data(), id: ref.uid}});    
  }).catch((err)=>{
    const error = {
      title: "Falha ao autenticar",
      content: VerifyErroCode(err.code)
    }
    callback(error);
  })
}
Login.propTypes = {
  data: P.instanceOf(Map).isRequired,
  dispach: P.func.isRequired
}

async function LoginWithGoogle(dispach) {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(Auth, provider);

  getRedirectResult(Auth)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    console.log("\n\nToken: ", token);
    console.log("\n\nUser: ", user);

  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}
Login.propTypes = {
  dispach: P.func.isRequired
}

async function UploadImage(data, callback){
  const response = await fetch(data.uri);
  const blob  = await response.blob();

  uploadBytes(ref(Storage, 'images/'+data.id+'/'+'profile'), blob).then((snapshot)=>{
    getDownloadURL(ref(Storage, snapshot.metadata.fullPath.toString())).then((url)=>{
      callback(false, url);
    }).catch((err) => {
      const error = {
        title: "Falha ao recuperar URL",
        content: VerifyErroCode(err.code)
      }
      callback(true, error);
    });
    
  }).catch((err) => {
    const error = {
      title: "Falha ao enviar a foto",
      content: VerifyErroCode(err.code)
    }
    callback(true, error);
  });
}

export {Sign, Login, LoginWithGoogle, SignOut, UpDate, UploadImage, UpDateTokenNotification, UpDateNotificationList};

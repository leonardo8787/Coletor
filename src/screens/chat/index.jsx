import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { getFirestore, collection, onSnapshot, addDoc, firebaseApp, firebase } from "firebase/firestore";
import { Colors, Theme } from "../../constants/setting";
import { ImageCircleIcon } from "../../components/images";
import { ColetorContext } from "../../contexts/coletor/context";
import { ContainerTopClean } from "../../components/containers";
import { SizedBox } from 'sizedbox';
import { DarkTheme } from '@react-navigation/native';

const firestore = getFirestore(firebaseApp);

export function ChatScreen() {
  const {coletorState, coletorDispach} = useContext(ColetorContext)
  const basedImage                       = require("../../../assets/images/profile.webp");
  const [image, setImage]                = useState(basedImage);
  const [tarefas, setTarefas]            = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [senderPhoto, setSenderPhoto] = useState(null);

  useEffect(() => {
    const messagesRef = collection(firestore, 'messages');
    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      const messageList = snapshot.docs.map((doc) => doc.data());
      setMessages(messageList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(()=>{
    setImage(coletorState.photoUrl 
      ? {uri: coletorState.photoUrl} 
      : basedImage);
  },[coletorState.photoUrl]);
  
  async function changeProfileImage(){
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });  

    if (!result.canceled) {
      const source = {uri: result.assets[0].uri}
      setImage(source);
      setLoandding(true);
      coletorDispach({type: Types.LOADIMAGE, uri: source.uri, cb: changeImageCB})
    }
  }
  function changeImageCB (state, error) {
    if(state){
      setError(error);
    }else {
      coletorDispach({type:Types.SETIMAGE, payload: error})
      coletorDispach({type: Types.UPDATE, data: {...coletorState, photoUrl: error}, dispatch: coletorDispach, cb:updateCB});
    }
  }

  const handleMessageSend = async () => {
    if (message.trim() === '') {
      return;
    }

    const messagesRef = collection(firestore, 'messages');

    await addDoc(messagesRef, { text: message, senderPhotoUrl: senderPhoto, timestamp: new Date() });

    setMessage('');
  };

  const renderMessage = ({ item }) => {
    return (
      <View style={styles.messageContainer}>
        {item.senderPhotoUrl && <Image source={{ uri: item.senderPhotoUrl }} style={styles.senderPhoto} />}
        <View style={styles.messageContent}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <ImageCircleIcon
          size={130}
          sizeIcon={0}
          align={"flex-start"}
          img={image}
          color={Colors[Theme][5]}
          bgColor={Colors[Theme][0]}
        />
       <ContainerTopClean
         fun={()=>{}}
         text={"   "+coletorState.name}
         icon="information"
       />
       <SizedBox vertical={35} />
       <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.messagesContainer]}
        />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma mensagem..."
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleMessageSend}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
  },
  container2: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingLeft: 10, // Espaçamento à esquerda
  },
    messagesContainer: {
      paddingVertical: 16,
      paddingHorizontal: 10,
    }, 
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  senderPhoto: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageContent: {
    flex: 1,
  },
  messageText: {
    fontSize: 16,
    color: "#fafffd",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  button: {
    backgroundColor: "#10b981",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  containerTransparent: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor preta com 50% de transparência
  },
});

export default ChatScreen;

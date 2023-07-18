import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, Text, Image } from 'react-native';
// import { getFirestore, collection, onSnapshot, addDoc, firebaseApp, firebase } from "firebase/firestore";
import { setDoc, getDoc, collection, onSnapshot, addDoc, getFirestore, firebaseApp, Firestore, Timestamp } from "firebase/firestore";
import { Colors, Theme } from "../../constants/setting";
import { ImageCircleIcon } from "../../components/images";
import { ColetorContext } from "../../contexts/coletor/context";
import { ContainerTopClean } from "../../components/containers";
import { SizedBox } from 'sizedbox';
import { DarkTheme } from '@react-navigation/native';

const firestore = getFirestore(firebaseApp);

const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export function ChatScreen() {
  const { coletorState, coletorDispach } = useContext(ColetorContext);
  const [image, setImage] = useState(require("../../../assets/images/profile.webp"));
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = collection(firestore, 'messages');
    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      const messageList = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((message) => message.senderId === coletorState.id || message.recipientId === coletorState.id)
        .sort((a, b) => {
          // Check if both messages have a timestamp
          if (a.timestamp && b.timestamp) {
            return a.timestamp.toMillis() - b.timestamp.toMillis();
          } else if (a.timestamp) {
            return -1; // Place message without timestamp at the end (newest)
          } else if (b.timestamp) {
            return 1; // Place message without timestamp at the end (newest)
          } else {
            return 0; // If both messages don't have a timestamp, maintain their order
          }
        });
  
      setMessages(messageList);
    });
  
    return () => unsubscribe();
  }, []);
  

  useEffect(() => {
    if (coletorState.photoUrl) {
      setImage({ uri: coletorState.photoUrl });
    }
  }, [coletorState.photoUrl]);

  async function changeProfileImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const source = { uri: result.uri };
      setImage(source);
      coletorDispach({ type: Types.LOADIMAGE, uri: source.uri, cb: changeImageCB });
    }
  }

  function changeImageCB(state, error) {
    if (state) {
      setError(error);
    } else {
      coletorDispach({ type: Types.SETIMAGE, payload: error });
      coletorDispach({ type: Types.UPDATE, data: { ...coletorState, photoUrl: error }, dispatch: coletorDispach, cb: updateCB });
    }
  }

  async function handleMessageSend() {
    if (message.trim() === '') {
      return;
    }

    const user = coletorState.id;

    const newMessage = {
      text: message,
      senderId: user,
      recipientId: 'SkRfYjQdLsYhZydlXjXkKuKjzzm2',
      timestamp: Timestamp.fromDate(new Date()), // Add the current timestamp using Firestore Timestamp object
    };

    await addDoc(collection(firestore, 'messages'), newMessage);

    setMessage('');
  }

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.senderId === coletorState.name;
    const containerStyle = isCurrentUser ? styles.currentUserMessageContainer : styles.otherUserMessageContainer;

    return (
      <View style={[styles.messageContainer, containerStyle]}>
        {item.senderPhotoUrl && <Image source={{ uri: item.senderPhotoUrl }} style={styles.senderPhoto} />}
        <View style={styles.messageContent}>
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.timestampText}>{formatTimestamp(item.timestamp)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={changeProfileImage}>
        <ImageCircleIcon
          size={130}
          sizeIcon={30}
          align={"flex-start"}
          img={image}
          color={Colors[Theme][5]}
          bgColor={Colors[Theme][0]}
        />
      </TouchableOpacity>
      <SizedBox vertical={20} />
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        inverted // Display the latest messages at the bottom
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma mensagem..."
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholderTextColor="#8C8C8C"
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
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  messagesContainer: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align text to the start (top) of the message container
    maxWidth: '70%', // Limit the message container to 70% of the width
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  currentUserMessageContainer: {
    backgroundColor: '#5FC9A7', // Light green for messages sent by the current user
    alignSelf: 'flex-end',
  },
  otherUserMessageContainer: {
    backgroundColor: '#F5A623', // Orange for messages received from other users
    alignSelf: 'flex-start',
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
    color: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 8,
  },
  button: {
    backgroundColor: "#10b981",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatScreen;


import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { collection, onSnapshot, addDoc, getFirestore, firebaseApp, Timestamp } from "firebase/firestore";
import { ColetorContext } from "../../contexts/coletor/context";
import { SizedBox } from 'sizedbox';
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";

const firestore = getFirestore(firebaseApp);

const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export function ChatScreen({ route }) {
  const { coletorState, coletorDispach } = useContext(ColetorContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const { userId, userPhotoUrl, userName } = route.params;

  useEffect(() => {
    const messagesRef = collection(firestore, 'messages');
    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      const messageList = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((message) => (message.senderId === coletorState.id && message.recipientId === userId) || (message.recipientId === coletorState.id && message.senderId === userId) )
        .sort((a, b) => {
          if (a.timestamp && b.timestamp) {
            return a.timestamp.toMillis() - b.timestamp.toMillis();
          } else if (a.timestamp) {
            return -1; 
          } else if (b.timestamp) {
            return 1;
          } else {
            return 0;
          }
        });
      setMessages(messageList);
    });
    return () => unsubscribe();
  }, []);

  async function handleMessageSend() {
    if (message.trim() === '') {
      return;
    }

    const user = coletorState.id;

    const newMessage = {
      text: message,
      senderId: user,
      recipientId: userId,
      timestamp: Timestamp.fromDate(new Date()), 
    };

    await addDoc(collection(firestore, 'messages'), newMessage);

    setMessage('');
  }

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.senderId === coletorState.id;
    const containerStyle = isCurrentUser ? styles.currentUserMessageContainer : styles.otherUserMessageContainer;
    const alignDirection = isCurrentUser ? 'flex-end' : 'flex-start';
  
    return (
      <View style={[styles.messageContainer, containerStyle, { alignSelf: alignDirection }]}>
        <View style={styles.messageContent}>
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.timestampText}>{formatTimestamp(item.timestamp)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SizedBox vertical={20} />
      <Image source={{ uri: userPhotoUrl }}/>
      <Text>{userName}</Text>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        inverted 
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

export default ChatScreen;
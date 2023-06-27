import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { getFirestore, collection, onSnapshot, addDoc, firebaseApp, firebase } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

export function ChatScreen() {
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
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
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
  messagesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default ChatScreen;

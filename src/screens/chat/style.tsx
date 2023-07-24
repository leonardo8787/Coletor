import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  messagesContainer: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  senderPhoto: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
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
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    maxWidth: '80%', 
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 4, 
  },
  currentUserMessageContainer: {
    backgroundColor: '#5FC9A7', 
    alignSelf: 'flex-end',
    borderTopLeftRadius: 20,
  },
  otherUserMessageContainer: {
    backgroundColor: '#F5A623', 
    alignSelf: 'flex-start',
    borderTopRightRadius: 20,
  },
  messageContent: {
    flex: 1,
    paddingHorizontal: 12,
  },
  messageText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  timestampText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 4, 
  },
});
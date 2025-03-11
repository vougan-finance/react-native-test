import React, { useState } from 'react';
import { StyleSheet, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { faker } from '@faker-js/faker';


//this will be our mock data
const mockMessages = [
  { id: 1, text: 'Hello!', isUser: true },
  { id: 2, text: 'Hey, how are you?', isUser: false },
  { id: 3, text: 'I am doing great, thanks!', isUser: true },
  { id: 4, text: 'What about you?', isUser: true },
  { id: 5, text: 'I am good, just working on some code!', isUser: false },
];

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  //function for sending messages, note that the isUser flag will split user/nonuser messages
  const sendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: message, isUser: true },
      ]);
      setMessage('');
    }
  };

  // function to add a random message from faker
  const addRandomMessage = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const randomMessage = {
      id: messages.length + 1,
      text: faker.lorem.sentence(),
      isUser: false,
    };
  }


  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">VOUGANZAP</ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageContainer,
              msg.isUser ? styles.userMessage : styles.receiverMessage,
            ]}
          >
            <ThemedText style={styles.messageText}>{msg.text}</ThemedText>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#075E54',
  },
  logo: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  chatContainer: {
    flexGrow: 1,
    padding: 10,
    marginBottom: 60,
  },
  messageContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  receiverMessage: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#075E54',
    borderRadius: 50,
    padding: 10,
  },
});

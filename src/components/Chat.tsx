import React, { useState, useEffect } from 'react';
import { ref, onValue, push } from 'firebase/database';
import { db } from '../ts/firebase';
import '../css/Chat.css';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    const messagesRef = ref(db, 'messages');
    onValue(messagesRef, (snapshot) => {
      const messageData = snapshot.val();
      if (messageData) {
        const messageList: Message[] = Object.keys(messageData).map((key) => ({
          ...messageData[key],
          id: key,
        }));
        setMessages(messageList);
      }
    });
  }, []);

  const handleMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const messageRef = ref(db, 'messages');
    const message = {
      content: newMessage,
      timestamp: Date.now(),
    };
    push(messageRef, message);
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">Chat</h1>
      <ul className="message-list">
        {messages.map((message) => (
          <li key={message.id} className="message-item">{message.content}</li>
        ))}
      </ul>
      <form onSubmit={handleMessageSubmit} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="message-input"
          placeholder="Type your message..."
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default Chat;

interface Message {
  id: string;
  content: string;
  timestamp: number;
}

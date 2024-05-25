import React, { useState, useEffect } from 'react';
import { ref, onValue, push } from 'firebase/database';
import { db } from '../js/firebase';
import '../css/Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messagesRef = ref(db, 'messages');
    onValue(messagesRef, (snapshot) => {
      const messageData = snapshot.val();
      if (messageData) {
        const messageList = Object.keys(messageData).map((key) => ({
          ...messageData[key],
          id: key,
        }));
        setMessages(messageList);
      }
    });
  }, []);

  const handleMessageSubmit = (event) => {
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

/*
import React, { useState, useEffect } from 'react';
import { ref, onValue, push } from 'firebase/database';
import { db } from '../js/firebase';
import '../css/Chat.css';

const Chat = ({ currentUserId, chatPartnerId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const chatRoomId = [currentUserId, chatPartnerId].sort().join('_'); // Create a unique chat room ID

  useEffect(() => {
    const messagesRef = ref(db, `chatrooms/${chatRoomId}/messages`);
    onValue(messagesRef, (snapshot) => {
      const messageData = snapshot.val();
      if (messageData) {
        const messageList = Object.keys(messageData).map((key) => ({
          ...messageData[key],
          id: key,
        }));
        setMessages(messageList);
      }
    });
  }, [chatRoomId]);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const messageRef = ref(db, `chatrooms/${chatRoomId}/messages`);
    const message = {
      senderId: currentUserId,
      content: newMessage,
      timestamp: Date.now(),
    };
    push(messageRef, message);
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">Chat with {chatPartnerId}</h1>
      <ul className="message-list">
        {messages.map((message) => (
          <li key={message.id} className={`message-item ${message.senderId === currentUserId ? 'sent' : 'received'}`}>
            {message.content}
          </li>
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
*/
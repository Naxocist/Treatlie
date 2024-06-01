import React, { useState, useEffect } from 'react';
import { ref, onValue, push, get } from 'firebase/database';
import { db } from '../js/firebase';
import '../css/bundle.css';

const PatientChat = ({ currentUserId }) => {
  const [chatPartnerId, setChatPartnerId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  useEffect(() => {
    const fetchPairedDoctorId = async () => {
      const patientRef = ref(db, `patients/${currentUserId}/paired-doctor-uid`);
      const snapshot = await get(patientRef);
      if (snapshot.exists()) {
        setChatPartnerId(snapshot.val());
      }
    };

    fetchPairedDoctorId();
  }, [currentUserId]);

  useEffect(() => {
    if (chatPartnerId) {
      const chatRoomId = [currentUserId, chatPartnerId].sort().join('_');
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
    }
  }, [currentUserId, chatPartnerId]);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    if (chatPartnerId) {
      const chatRoomId = [currentUserId, chatPartnerId].sort().join('_');
      const messageRef = ref(db, `chatrooms/${chatRoomId}/messages`);
      const message = {
        senderId: currentUserId,
        content: newMessage,
        timestamp: Date.now(),
      };
      push(messageRef, message);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">Chat with doctors</h1>
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

export default PatientChat;
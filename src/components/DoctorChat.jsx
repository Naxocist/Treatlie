import React, { useState, useEffect } from 'react';
import { ref, onValue, push } from 'firebase/database';
import { db } from '../js/firebase';
import '../css/bundle.css';

const DoctorChat = ({ currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [chatRoomId, setChatRoomId] = useState('');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const patientsRef = ref(db, 'patients');
    onValue(patientsRef, (snapshot) => {
      const patientData = snapshot.val();
      if (patientData) {
        const patientList = Object.keys(patientData);
        setPatients(patientList);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedPatientId) {
      const newChatRoomId = [currentUserId, selectedPatientId].sort().join('_');
      setChatRoomId(newChatRoomId);
    }
  }, [currentUserId, selectedPatientId]);

  useEffect(() => {
    if (chatRoomId) {
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
  }, [chatRoomId]);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    if (!chatRoomId) {
      console.error('No chat room selected.');
      return;
    }
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
      <h1 className="chat-title">Doctor Chat</h1>
      <div>
        <label htmlFor="patientSelect">Select a patient to chat with : </label>
        <select
          id="patientSelect"
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
        >
          <option value="">Select...</option>
          {patients.map((patientId) => (
            <option key={patientId} value={patientId}>{patientId}</option>
          ))}
        </select>
      </div>
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

export default DoctorChat;

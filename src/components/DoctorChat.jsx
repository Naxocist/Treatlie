import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { db } from '../js/firebase'; // Ensure this imports the initialized Firebase app
import '../css/bundle.css';

const DoctorChat = ({ currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [chatRoomId, setChatRoomId] = useState('');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (currentUserId) {
      const patientsRef = ref(db, 'patients');
      onValue(patientsRef, (snapshot) => {
        const patientData = snapshot.val();
        if (patientData) {
          const patientIds = Object.entries(patientData)
            .filter(([_, patient]) => patient['paired-doctor-uid'] === currentUserId)
            .map(([patientId, _]) => patientId);

          const patientPromises = patientIds.map((patientId) =>
            new Promise((resolve) => {
              const patientInfoRef = ref(db, `info/${patientId}`);
              onValue(patientInfoRef, (snap) => {
                resolve({ id: patientId, name: snap.val()?.name || patientId });
              });
            })
          );

          Promise.all(patientPromises).then((patientList) => {
            setPatients(patientList);
          });
        }
      });
    }
  }, [currentUserId]);

  useEffect(() => {
    if (selectedPatientId) {
      const newChatRoomId = [currentUserId, selectedPatientId].sort().join('_');
      setChatRoomId(newChatRoomId);
    }
  }, [currentUserId, selectedPatientId]);

  useEffect(() => {
    if (chatRoomId) {
      const messagesRef = ref(getDatabase(), `chatrooms/${chatRoomId}/messages`);
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
    const messageRef = ref(getDatabase(), `chatrooms/${chatRoomId}/messages`);
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
        <label htmlFor="patientSelect">Select a patient to chat with: </label>
        <select
          id="patientSelect"
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
        >
          <option value="">Select...</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>{patient.name}</option>
          ))}
        </select>
      </div>
      <br></br>
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

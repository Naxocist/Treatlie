import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { db } from '../js/firebase';
import '../css/bundle.css';

const DoctorChat = ({ currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [chatRoomId, setChatRoomId] = useState('');
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

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

          Promise.all(patientPromises).then(setPatients);
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

  const handleMessageSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!chatRoomId || !newMessage.trim()) {
        console.error('No chat room selected or message is empty.');
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
    },
    [chatRoomId, currentUserId, newMessage]
  );

  const patientOptions = useMemo(() => {
    return patients.map((patient) => (
      <option key={patient.id} value={patient.id}>
        {patient.name}
      </option>
    ));
  }, [patients]);
  
  return (
    <div className="chat-container">
      <Link to='../doctor' className='back-button'>Doctor</Link>
      <h1 className="chat-title">Doctor Chat</h1>
      <div className="patient-select-container">
        <label htmlFor="patientSelect">Select a patient to chat with: </label>
        <select
          id="patientSelect"
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
          className="patient-select"
        >
          <option value="">Select...</option>
          {patientOptions}
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

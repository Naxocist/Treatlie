import React, { useState, useEffect } from 'react';
import { ref, onValue, push, get } from 'firebase/database';
import { Link } from 'react-router-dom';
import { db } from '../js/firebase';
import '../css/bundle.css';

const DoctorChat = ({ currentUserId, patientUserId }) => {

  const [chatPartnerId, setChatPartnerId] = useState(null);
  const [chatPartnerName, setChatPartnerName] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');


  useEffect(() => {
    setChatPartnerId(patientUserId)
  }, [])

  useEffect(() => {
    if (chatPartnerId) {
      const chatRoomId = [currentUserId, patientUserId].sort().join('_');
      const messagesRef = ref(db, `chatrooms/${chatRoomId}/messages`);
      onValue(messagesRef, res => {
        const messageData = res.val();
        if (messageData) {
          const messageList = Object.keys(messageData).map((key) => ({
            ...messageData[key],
            id: key,
          }));

          // console.log(messageList)
          setMessages(messageList);
        }
      });

      const patientRef = ref(db, `info/${patientUserId}/name`)
      get(patientRef).then( res => {
        if (res.exists()) {
          setChatPartnerName(res.val());
        }
      });
    }
  }, [chatPartnerId]);

  const handleMessageSubmit = (event) => {
    event.preventDefault();

    const chatRoomId = [currentUserId, patientUserId].sort().join('_');
    if (chatPartnerId) {
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
      <Link to={`/doctor/profile/${patientUserId}`} className='back-button'>Back</Link>
      <h1 className="chat-title">Chat with {chatPartnerName}</h1>
      <ul className="message-list">
        {messages.map( message => (
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

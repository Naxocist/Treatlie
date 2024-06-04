import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../js/firebase';
import '../css/bundle.css';

const Patient = () => {
  const navigate = useNavigate();

  const handleChat = () => {
    const currentUserId = auth.currentUser.uid;
    navigate(`/patientchat/${currentUserId}`);
  };

  return (
    <div>
      <button className="chat-button" onClick={handleChat}>Chat with Doctors</button>
    </div>
  );
};

export default Patient;

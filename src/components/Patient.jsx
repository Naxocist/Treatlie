import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../js/firebase';

const Patient = () => {
  const navigate = useNavigate();

  const handleChat = () => {
    const currentUserId = auth.currentUser.uid;
    navigate(`/patientchat/${currentUserId}`);
  };

  return (
    <div>
      <button onClick={() => handleChat()}>Chat with Doctors</button>
    </div>
  );
};

export default Patient;

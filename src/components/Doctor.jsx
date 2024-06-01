import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../js/firebase';

const Doctor = () => {
  const navigate = useNavigate();

  const handleChat = () => {
    const currentUserId = auth.currentUser.uid;
    navigate(`/doctorchat/${currentUserId}`);
  };

  return (
    <div>
      <button onClick={() => handleChat()}>Chat with Patient</button>
    </div>
  );
};

export default Doctor;

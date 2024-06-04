import { useEffect, useState } from "react";
import unknown from "./../../../public/unknown.jpg"
import { onValue, ref } from "firebase/database";

import { auth, db } from '../../js/firebase'
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";


function Profile() {

  const [uid, setUid] = useState('')
  const [partner, setPartner] = useState('')
  const navigate = useNavigate()


  useEffect(() => {

    onAuthStateChanged(auth, user => {
      if(user) {
        setUid(user.uid)

        // onValue(ref(db, `patients/${user.uid}/paired-doctor-uid`), res => {
        //   setPartner(res.val())
        // })
      }else {
        navigate('/')
      }
    }
    )
  }, [])
  
  const handleChat = () => {
    navigate(`/patientchat/${uid}`);
  };

  return(
    <div className='tp-wrap'>
      <div className='pfp-wrap'>
        <img className='pfp' src={unknown}></img>
      </div>

      <div className='info-wrap'>
        <div className='below-info-wrap'>
          <h1>Patient A</h1>
          <div className='chat-button'>
            <button onClick={handleChat}>
              Chat
            </button>
          </div>
        </div>
        <div className='below-info-wrap'>
          <p>Birth of date: 5/6/2017</p>
          <p>Age: 7</p>
        </div>
        <div className='below-info-wrap'>
          <p>Blood type: O+</p>
          <p>Contact: +66 062 939 3828</p>
        </div>
        <div className='below-info-wrap'>
          <p>Address: 239/21 Melon Street</p>
        </div>
      </div>
    </div>
  ) 
}

export default Profile;
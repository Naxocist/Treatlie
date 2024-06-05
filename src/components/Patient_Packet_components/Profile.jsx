import { useEffect, useState } from "react";
import unknown from "./../../../public/unknown.jpg"
import { onValue, ref } from "firebase/database";

import { auth, db } from '../../js/firebase'
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { simplifyDate, calculateAge } from "../../js/utils";


function Profile() {

  const [uid, setUid] = useState('')

  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [blood, setBlood] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [age, setAge] = useState('')
  const [symtoms, setSymtoms] = useState('')
  const [plan, setPlan] = useState('')

  const navigate = useNavigate()


  useEffect(() => {

    onAuthStateChanged(auth, user => {
      if(user) {
        setUid(user.uid)

        onValue(ref(db, `info/` + user.uid), res => {
          const data = res.val()

          setName(data['name'])

          const dateObj = new Date(data['birth-date'])
          const cdate = simplifyDate(dateObj) 

          setDate(cdate)
          setAge(calculateAge(cdate))
          setBlood(data['blood'])
          setAddress(data['address'])
          setContact(data['contact'])
        })
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
          <h1>{name}</h1>
          <div className='chat-button'>
            <button onClick={handleChat}>
              Chat
            </button>
          </div>
        </div>
        <div className='below-info-wrap'>
          <p>Birth of date: {date}</p>
          <p>Age: {age}</p>
        </div>
        <div className='below-info-wrap'>
          <p>Blood type: {blood}</p>
          <p>Contact: {contact}</p>
        </div>
        <div className='below-info-wrap'>
          <p>Address: {address}</p>
        </div>
      </div>
    </div>
  ) 
}

export default Profile;
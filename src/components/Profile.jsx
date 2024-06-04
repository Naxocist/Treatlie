import { useState } from 'react';

import { useOutlet, useOutletContext, useParams } from 'react-router-dom'

import unknown from '../assets/unknown.jpg'
import { calculateAge } from '../js/utils'

import Exercises from './Exercises';
import Packets from './Packets';

import { simplifyDate } from '../js/utils';


function Profile() {
  const [removeMode, setRemoveMode] = useState(false)
  const outletLoaded = useOutlet();

  const params = useParams()
  const { patientsInfo, usersInfo } = useOutletContext()

  const uid = params.uid
  const info = usersInfo[uid]
  const name = info['name']
  const birthdate = simplifyDate(info['birth-date'])
  const blood = info['blood']
  const contact = info['contact']
  const address = info['address']

  const symtoms = info['symtoms']
  const plan = info['plan']
  
  const packets = patientsInfo[uid]['packets']

  const age = calculateAge(birthdate)

  return (
    <div className='profile-wrap'>
      <div className='tp-wrap'>
          <div className='pfp-wrap'>
            <img src={unknown}></img>
          </div>

          <div className='info-wrap'>
            <h1>{name}</h1>
            <div className='below-info-wrap'>
              <p>Birth of date: {birthdate}</p>
              <p>Age: {age}</p>
            </div>
            <div className='below-info-wrap'>
              <p >Blood type: {blood}</p>
              <p>Contact: {contact}</p>
            </div>
            <div className='below-info-wrap'>
              <p>Address: {address}</p>
            </div>
          </div>
      </div>


      <div className='desc'>
        <p>{symtoms}</p>
      </div>

      <div className='desc'>
        <p><strong>Treatment Plan: </strong>{plan}</p>
      </div>

      {outletLoaded ?
        <Exercises 
          uid={uid}
          packets={packets}
          removeMode={removeMode}
          setRemoveMode={setRemoveMode}
        />
        :
        <Packets 
          uid={uid}
          packets={packets}
          removeMode={removeMode}
          setRemoveMode={setRemoveMode}
        />
      }
    </div>
  )
}

export default Profile;
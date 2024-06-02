import { useState } from 'react';

import { useOutlet, useOutletContext, useParams } from 'react-router-dom'

import { ref, push, set } from "firebase/database";
import { db } from '../js/firebase';

import unknown from '../assets/unknown.jpg'
import { ISOtoString, calculateAge } from '../js/utils'

import Packet from './Packet';
import Exercises from './Exercises';
import Packets from './Packets';


function Profile() {
  const [removeMode, setRemoveMode] = useState(false)
  const outletLoaded = useOutlet();

  const params = useParams()
  const { patientsInfo, usersInfo } = useOutletContext()

  const uid = params.uid;
  const name = usersInfo[uid]['name']
  const birthdate = usersInfo[uid]['birth-date']
  const age = calculateAge(birthdate)
  const packets = patientsInfo[uid]['packets']

  return (
    <>
      <div className='tp-wrap'>
          <div className='pfp-wrap'>
            <img className='pfp' src={unknown}></img>
          </div>

          <div className='info-wrap'>
            <h1>{name}</h1>
            <div className='below-info-wrap'>
              <h3 className='birth-date'>{birthdate}</h3>
              <h3>{age}</h3>
            </div>
          </div>
      </div>


      <div className='desc'>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt quo autem, temporibus ea dolore aliquid libero ipsam vel distinctio labore?</p>
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
    </>
  )
}

export default Profile;
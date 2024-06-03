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

  const uid = params.uid;
  const name = usersInfo[uid]['name']
  const birthdate = simplifyDate(usersInfo[uid]['birth-date'])
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
              <h3 className='birth-date'>{birthdate}</h3>
              <h3>{age}</h3>
            </div>
          </div>
      </div>


      <div className='desc'>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt quo autitem, temporibus ea dolore aliquid libero ipsam vel distinctio labore?</p>
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
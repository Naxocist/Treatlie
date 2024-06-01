import { useOutlet, useOutletContext, useParams } from 'react-router-dom'

import { ref, push, set } from "firebase/database";
import { db } from '../js/firebase';

import unknown from '../assets/unknown.jpg'
import { ISOtoString, calculateAge } from '../js/utils'

import Packet from './Packet';


function Profile() {

  const params = useParams()
  const { patientsInfo, usersInfo } = useOutletContext()

  const outletLoaded = useOutlet();

  const uid = params.uid;
  const name = usersInfo[uid]['name']
  const birthdate = usersInfo[uid]['birth-date']
  const age = calculateAge(birthdate)

  const packets = patientsInfo[uid]['packets']

  const handleAddPacket = () =>{
    const dateIso = (new Date).toISOString()

    set(push(ref(db, `patients/${uid}/packets`)), {
      "created" : dateIso
    })
  }

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


      <div className='ex-head'>
        <h1>Exercise Packets</h1>
      </div>

      <div className='ex-wrap'>
        <h2>Today: {ISOtoString((new Date).toISOString())}</h2>

      <div className='buttons-group-wrap'>
        <div className='ex-toggle'>
          <button className='btn'>Toggle DONE</button>
        </div>
        <div className='add-packets'>
          <button className='btn' onClick={handleAddPacket}>add a new packet</button>
        </div>
      </div>

        <div className='packets-wrap'>
          {
            packets ?
              Object.entries(packets).map( ([key, packet]) => (
                <Packet key={key} hash={key} packet={packet} uid={uid}/>
              ))
              :
              <></>
          }
        </div>
      </div>

    </>
  )
}

export default Profile;
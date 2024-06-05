import { ref, remove } from "firebase/database"
import { ISOtoString, convertDeadline } from "../js/utils"
import { db } from "../js/firebase"

import { NavLink } from "react-router-dom"

import { motion } from 'framer-motion'

function Packet({hash, packet, uid, removeMode, finished}) {

    const handleRemovePacket = () => {
        const confirmed = window.confirm(`You are deleting a packet. This process can't be undone. \nAre you sure?`)

        if(confirmed) {
          console.log(uid, hash)
          remove(ref(db, `patients/${uid}/packets/${hash}`))
        }
    }

    const created = ISOtoString(packet['created'])
    const deadline = convertDeadline(packet['deadline'])

    return (
      <>
        {removeMode ?
          <div onClick={handleRemovePacket} className='outer-wrap'>
            <div 
              className={`list-rm-wrap ${finished ? 'list-hover' : ''}`}
            >
              <p> Assigned on </p> 
              <p>{created} </p>
              <p>Due <u>{deadline}</u></p>
            </div>
          </div>
          :
          <NavLink to={'packet/' + hash} className='outer-wrap'>
            <div 
              className={`list-nm-wrap ${finished ? 'list-hover' : ''}`}
            >
              <p>Assigned on</p>
              <p>{created}</p>

              <p>Due <u>{deadline}</u></p>
            </div>
          </NavLink>
        }
      </>
    )
}

export default Packet

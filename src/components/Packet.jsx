import { ref, remove } from "firebase/database"
import { ISOtoString, convertDeadline } from "../js/utils"
import { db } from "../js/firebase"

import { NavLink } from "react-router-dom"

import { motion } from 'framer-motion'

function Packet({hash, packet, uid, removeMode}) {

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
      <div >
        {removeMode ?
          <button onClick={handleRemovePacket} className='list-rm-wrap btn-reset'>
            <div>
              Assign on {created}
            </div>
            <div>
              Due {deadline}
            </div>
          </button>
          :
          <NavLink to={'packet/' + hash} className='list-nm-wrap btn-reset'>
            <div>
              Assign on {created}
            </div>
            <div>
              Due {deadline}
            </div>
          </NavLink>
        }
      </div>
    )
}

export default Packet

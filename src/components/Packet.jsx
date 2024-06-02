import { ref, remove } from "firebase/database"
import { ISOtoString } from "../js/utils"
import { db } from "../js/firebase"

import { NavLink } from "react-router-dom"

function Packet({hash, packet, uid, removeMode}) {

    const handleRemovePacket = () => {
        const confirmed = window.confirm(`You are deleting a packet. This process can't be undone. \nAre you sure?`)

        if(confirmed) {
          console.log(uid, hash)
          remove(ref(db, `patients/${uid}/packets/${hash}`))
        }
    }

    return (
      <>
          {removeMode ?
            <button className='btn-reset btn-remove' onClick={handleRemovePacket}>
              <div className='packet-wrap'>
                {ISOtoString(packet['created'])}
              </div>
            </button>
            :
            <NavLink to={'packet/' + hash}>
              <button className='btn-reset btn-norm'>
                <div className='packet-wrap'>
                  {ISOtoString(packet['created'])}
                </div>
              </button>
            </NavLink>
          }
      </>
    )
}

export default Packet

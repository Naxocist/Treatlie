import { ref, remove } from "firebase/database"
import { ISOtoString, convertDeadline } from "../js/utils"
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

    const created = ISOtoString(packet['created'])
    const deadline = convertDeadline(packet['deadline'])

    return (
      <>
        {removeMode ?
          <button onClick={handleRemovePacket} className='list-rm-wrap btn-reset'>
            <div>
              {ISOtoString(created)}
            </div>
            <div>
              {ISOtoString(deadline)}
            </div>
          </button>
          :
          <NavLink to={'packet/' + hash} className='list-nm-wrap btn-reset'>
            <div>
              Assign: {created}
            </div>
            <div>
              Due  {deadline}
            </div>
          </NavLink>
        }
      </>
    )
}

export default Packet

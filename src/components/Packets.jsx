import { db } from "../js/firebase"
import { set, push, ref } from 'firebase/database'

import Packet from "./Packet"
import { useState } from "react"

function Packets({uid, packets, removeMode, setRemoveMode}) {

  const [filter, setFilter] = useState(false)



  const handleAddPacket = () =>{
    const dateIso = (new Date).toISOString()

    set(push(ref(db, `patients/${uid}/packets`)), {
      "status" :  {
        "done": 0,
        "goal": 0,
      },
      "created": dateIso,
      "deadline": (new Date).toISOString()
    })
  }

  return (
    <div className='bot-wrap'>
      <div className='bot-head'>
        <h1>Exercise Packets</h1>
        {/* <h4>date format: day / month / year</h4> */}
        {/* <h4>Today: {simplifyDate(new Date)}</h4> */}
      </div>
      <hr/>


      <div className='bot-btns-wrap'>
        <div className='filter-toggle'>
          <button 
            className='btn' 
            onClick={() => setFilter(!filter)}
            style={{
              "backgroundColor": filter ? "var(--primary-green)" : "",
            }}
            >Filter DONE</button>
        </div>
        <div className='add-packet'>
          <button className='btn' onClick={handleAddPacket}>Add a packet</button>
        </div>
        <div className='toggle-remove' >
          <button
            className='btn'
            style={{
              "backgroundColor": removeMode ? "var(--primary-red)" : "",
            }}
            onClick={() => {
              setRemoveMode(!removeMode)
            }}>
            Remove mode
          </button>
        </div>
      </div>

      <div className='bot-list-wrap'>
        { packets ?
            Object.entries(packets).map(([key, packet]) => (
              <>
                {!filter || packet['status']['done'] === 0 || (filter && packet['status']['done'] < packet['status']['goal']  ) ?
                  <Packet
                    key={key}
                    hash={key}
                    packet={packet}
                    uid={uid}
                    removeMode={removeMode}
                    finished={packet['status']['done'] &&packet['status']['done'] >= packet['status']['goal']}
                  />
                  :
                  <></>
                }
              </>
            ))
            :
            <h2>There are no packets</h2>
        }
      </div>

    </div>
  )
}

export default Packets

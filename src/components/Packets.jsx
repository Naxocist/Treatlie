import { db } from "../js/firebase"
import { set, push, ref } from 'firebase/database'

import { simplifyDate } from "../js/utils"
import Packet from "./Packet"

function Packets({uid, packets, removeMode, setRemoveMode}) {


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
        <h1>Exercise Packs</h1>
        <h4>Today: {simplifyDate(new Date)}</h4>
      </div>

      <hr/>

      <div className='bot-list-wrap'>
        { packets ?
            Object.entries(packets).map(([key, packet]) => (
              <Packet
                key={key}
                hash={key}
                packet={packet}
                uid={uid}
                removeMode={removeMode}
              />
            ))
            :
            <h2>There are no packets</h2>
        }
      </div>

      <div className='bot-btns-wrap'>
          <div className='filter-toggle'>
            <button className='btn'>filter DONE</button>
          </div>
          <div className='add-packet'>
            <button className='btn' onClick={handleAddPacket}>add a packet</button>
          </div>
          <div className='toggle-remove' >
            <button
              className='btn'
              style={{ 
                "backgroundColor": removeMode ? "var(--primary-red)" : "" ,
              }}
              onClick={() => {
                setRemoveMode(!removeMode)
              }}>
              remove mode
            </button>
          </div>
        </div>
    </div>
  )
}

export default Packets

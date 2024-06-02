import { db } from "../js/firebase"
import { set, push, ref } from 'firebase/database'

import { ISOtoString } from "../js/utils"
import Packet from "./Packet"

function Packets({uid, packets, removeMode, setRemoveMode}) {


  const handleAddPacket = () =>{
    const dateIso = (new Date).toISOString()

    set(push(ref(db, `patients/${uid}/packets`)), {
      "status" :  {
        "done": 0,
        "goal": 0,
      },
      "created" : dateIso
    })
  }

  return (
    <>
      <div className='ex-head'>
        <h1>Exercise Packets</h1>
      </div>

      <div className='ex-wrap'>
        <h2>Today: {ISOtoString((new Date).toISOString())}</h2>

        <div className='buttons-group-wrap'>
          <div className='ex-toggle'>
            <button className='btn'>filter DONE</button>
          </div>
          <div className='add-packets'>
            <button className='btn' onClick={handleAddPacket}>add a packet</button>
          </div>
          <div className='toggle-remove' >
            <button
              className='btn'
              style={{ "backgroundColor": removeMode ? "#F9564F" : "" }}
              onClick={() => {
                setRemoveMode(!removeMode)
              }}>
              remove mode
            </button>
          </div>
        </div>

        <div className='packets-wrap'>
          {
            packets ?
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
              <></>
          }
        </div>
      </div>
    </>
  )
}

export default Packets

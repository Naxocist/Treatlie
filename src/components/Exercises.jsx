import { useState } from "react"
import { useParams } from "react-router-dom"

import { convertDeadline } from "../js/utils"

import Exercise from "./Exercise"
import Popup from './Popup'
import DatePopup from "./DatePopUp"


function Exercises({uid, packets, removeMode, setRemoveMode}) {

  const [datePopUp, setDatePopUp] = useState(false)

  const params = useParams()
  const [popUp, setPopUp] = useState(false)

  const hash = params['hash']
  const packet = packets[hash]
  const exercises = packet['exercises']
  const deadline = convertDeadline(packet['deadline'])


  return (
    <>
      { popUp && <Popup uid={uid} hash={hash} setPopUp={setPopUp}/> }

      { datePopUp && <DatePopup uid={uid} hash={hash} setDatePopUp={setDatePopUp}/> }


      <div className='bot-head'>
        <h1>Exercises</h1>
        <div>
          <h4 onClick={()=>setDatePopUp(true)}>Due date: {deadline}</h4>
        </div>
      </div>

      <hr/>

      <div className='bot-btns-wrap'>
        <div className='filter-toggle'>
          <button className='btn'>filter DONE</button>
        </div>
        <div className='add-packets'>
          <button className='btn' onClick={() => setPopUp(true)}>add an exercise</button>
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

      <div className='bot-list-wrap'>
        { exercises ?
            Object.entries(exercises).map(([exName, status]) => (
              <Exercise
                key={exName}
                uid={uid}
                hash={hash}
                exName={exName}
                status={status}
                removeMode={removeMode}
              />
            ))
            :
            <h2>There are no exercises</h2>
        }
      </div>

    </>
  )
}

export default Exercises

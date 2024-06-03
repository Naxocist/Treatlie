import { useParams } from "react-router-dom"

import { ISOtoString } from "../js/utils"

import Exercise from "./Exercise"
import Popup from './Popup'
import { useState } from "react"

import { simplifyDate } from "../js/utils"


function Exercises({uid, packets, removeMode, setRemoveMode}) {
  const params = useParams()
  const [popUp, setPopUp] = useState(false)

  const hash = params['hash']
  const packet = packets[hash]
  const exercises = packet['exercises']
  const deadline = simplifyDate(packet['deadline'])


  return (
    <>
      { popUp && <Popup uid={uid} hash={hash} setPopUp={setPopUp}/> }

      <div className='bot-head'>
        <h1>Exercises</h1>
        {/* <h4>Today: {simplifyDate(new Date)}</h4> */}
      </div>

      <hr/>

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
            <h2>There are no execises</h2>
        }
      </div>

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
    </>
  )
}

export default Exercises

import { Link, useNavigate, useParams } from "react-router-dom"

import { ISOtoString } from "../js/utils"

import { db } from "../js/firebase"
import { set, ref } from "firebase/database"

import Exercise from "./Exercise"
import Popup from './Popup'
import { useState } from "react"


function Exercises({uid, packets, removeMode, setRemoveMode}) {
  const params = useParams()
  const [popUp, setPopUp] = useState(false)

  const hash = params['hash']
  const packet = packets[hash]
  const exercises = packet['exercises']


  return (
    <>
      { popUp && <Popup uid={uid} hash={hash} setPopUp={setPopUp}/> }

      <div className='ex-head'>
        <h1>Exercises</h1>
      </div>

      <div className='ex-wrap'>

        <div>
          
          <h2>Today: {ISOtoString((new Date).toISOString())}</h2>
        </div>

        <div className='buttons-group-wrap'>
          <div className='ex-toggle'>
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

        <div className='packets-wrap'>
          {
              exercises ?
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
                <></>
            }
          </div>
      </div>
    </>
  )
}

export default Exercises

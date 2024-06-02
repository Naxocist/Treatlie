import { useNavigate, useParams } from "react-router-dom"

import { ISOtoString } from "../js/utils"

import { db } from "../js/firebase"
import { set, ref } from "firebase/database"

import Exercise from "./Exercise"


function Exercises({uid, packets, removeMode, setRemoveMode}) {
  const params = useParams()

  const hash = params['hash']
  const packet = packets[hash]
  const exercises = packet['exercises']

  const handleAddExercise = () => {
    const exName = 'test'
    set(ref(db, `patients/${uid}/packets/${hash}/exercises/${exName}`), {
      "done": 0,
      "goal": 0,
    })
  }

  return (
    <>
      <div className='ex-head'>
        <h1>Exercises</h1>
      </div>

      <div className='ex-wrap'>

        <h2>Today: {ISOtoString((new Date).toISOString())}</h2>

        <div className='buttons-group-wrap'>
          <div className='ex-toggle'>
            <button className='btn'>filter DONE</button>
          </div>
          <div className='add-packets'>
            <button className='btn' onClick={handleAddExercise}>add an exercise</button>
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

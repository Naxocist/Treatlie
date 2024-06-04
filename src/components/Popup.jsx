import { Autocomplete, Button, TextField } from '@mui/material'

import { db } from '../js/firebase'
import { increment, ref, set, update } from 'firebase/database'

import { useState } from 'react'


const exList = ['right_leg_raise', 'left_leg_raise', 'arms_raise']


function Popup({uid, hash, setPopUp}) {

  const [selectedEx, setSelectedEx] = useState(null)
  const [goal, setGoal] = useState(null)

  const handleAddExercise = () => {
    console.log(selectedEx, goal)
    if(!selectedEx || !goal) {
      alert("Please fill the form")
      return 
    }

    if(goal <= 0) {
      alert("The number of times needs to be greater than 1")
      return 
    }

    set(ref(db, `patients/${uid}/packets/${hash}/exercises/${selectedEx}`), {
      "done": 0,
      "goal": parseInt(goal),
    }).then(() => {
      setPopUp(false)
    })

    const updates = {}
    updates[`patients/${uid}/packets/${hash}/status/goal`] = increment(1)
    update(ref(db), updates);
  }

  return (
    <div className='popup-wrap'>
      <div className='popup'>
        <h1>Add an exercise</h1>

        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={exList}
          sx={{ width: 300}}
          onChange={(e, val) => setSelectedEx(val)}
          renderInput={(params) => 
            <TextField {...params} label="exercise" />}
        />

        <div className='popup-tf-wrap'>
          <TextField id="standard-basic" label="number of times" variant="standard" onChange={(e) => setGoal(e.target.value)} />
        </div>


        <div className="popup-btn-wrap">
          <Button variant="contained" onClick={handleAddExercise}>submit</Button>
          <Button variant="contained" color="error" onClick={() => setPopUp(false)}>cancel</Button>
        </div>
      </div>
    </div>
  )
}

export default Popup

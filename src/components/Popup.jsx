import { Autocomplete, Button, TextField } from '@mui/material'

import { db } from '../js/firebase'
import { ref, set } from 'firebase/database'

import { useState } from 'react'


const exList = ['nod', 'right leg raise', 'left leg raise']


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
      "goal": goal,
    }).then(() => {
      setPopUp(false)
    })
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

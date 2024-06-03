import { useState } from 'react'

import { Button} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

import { db } from '../js/firebase'
import { ref, update } from 'firebase/database'


function DatePopup({ uid, hash, setDatePopUp }) {

  const [date, setDate] = useState(null)

  const handleChangeDueDate = () => {

    if (!date) {
      alert("Please fill the form")
      return
    }

    const updates = {}
    updates[`patients/${uid}/packets/${hash}/deadline`] = dayjs(date).toISOString()

    update(ref(db), updates).then(()=>setDatePopUp(false))
  }

  return (
    <div className='popup-wrap'>
      <div className='popup popup-date'>
        <h1>Set due date</h1>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            onChange={(val) => setDate(val)}
            label="select date"
            sx={{ width: "100%" }}
            format='DD/MM/YYYY'
          />

        </LocalizationProvider>
        <div className="popup-btn-wrap">
          <Button variant="contained" onClick={handleChangeDueDate}>submit</Button>
          <Button variant="contained" color="error" onClick={() => setDatePopUp(false)}>cancel</Button>
        </div>
      </div>
    </div>
  )
}

export default DatePopup

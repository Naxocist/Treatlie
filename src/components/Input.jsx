import { useState } from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { Button, TextField } from '@mui/material';

import { ref, set } from 'firebase/database';
import { db, auth } from '../js/firebase'
import { useNavigate } from 'react-router-dom';


function Input() {

  const [name, setName] = useState('')
  const [date, setDate] = useState("")

  dayjs.extend(utc)
  dayjs.extend(timezone)

  // const userTZ = dayjs.tz.guess()
  const navigate = useNavigate()

  const handleSubmit = () => {
    const uid = auth.currentUser.uid
    if(!uid) {
      navigate('/')
      return 
    }

    set(ref(db, '/info/' + uid), {
      'name': name,
      'birth-date': date,
      'role': 'patient'
    }).then(() => {
      navigate('/patient')
    })
  }

  return (
    <div className='input-wrap'>
      <TextField id="outlined-basic" label="Full Name" variant="outlined" onChange={(e) => setName(e.target.value)}/> 

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker onChange={(val) => {
          setDate(dayjs(val).toISOString())
        }} />
      </LocalizationProvider>

      <Button variant="contained" color="success" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  )
}

export default Input

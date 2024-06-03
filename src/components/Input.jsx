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

      <div className='form-wrap'>

        <div className='name-wrap'>
          <TextField id="standard-basic" label="Full Name" variant="standard" onChange={(e) => setName(e.target.value)} className='name' />
        </div>

        <div className='date-wrap'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={(val) => {
              setDate(dayjs(val).toISOString())
            }} className='date'/>
          </LocalizationProvider>
        </div>
      </div>

      <div className='submit-wrap'>
        <Button variant="contained" color="success" onClick={handleSubmit} className='submit' sx={{
          fontSize: '1.25em'
        }}>
          submit
        </Button>
      </div>
    </div>
  )
}

export default Input

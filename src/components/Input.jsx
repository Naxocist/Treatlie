import { useState } from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { Autocomplete, Button, TextField } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input'

import { ref, set } from 'firebase/database';
import { db, auth } from '../js/firebase'
import { useNavigate } from 'react-router-dom';


const bloodType = ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-', 'A', 'B', 'O', 'AB']

function Input() {

  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [blood, setBlood] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [symtoms, setSymtoms] = useState('')
  const [plan, setPlan] = useState('')

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

    // console.log(name, date, blood, address, contact)
    // console.log(symtoms, plan)

    set(ref(db, '/info/' + uid), {
      'name': name,
      'birth-date': dayjs(date).toISOString(),
      'blood': blood,
      'address': address,
      'contact': contact,
      'symtoms': symtoms,
      'plan': plan,
      'role': 'patient'
    }).then(() => {
      navigate('/patient')
    })
  }

  return (
    <div className='input-wrap'>

      <h1>Patient Registration</h1>
      <div className='form-wrap'>

        <div className='line'>
          <div>
            <TextField id="standard-basic" label="Full Name" variant="outlined" onChange={(e) => setName(e.target.value)} fullWidth />
          </div>

          <MuiTelInput value={contact} onChange={(val)=>setContact(val)} label='contact'/>

        </div>

        <div className='line'>
          <div>
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              options={bloodType}
              onChange={(e, val) => setBlood(val)}
              renderInput={(params) =>
                <TextField {...params} label="blood type"
              fullWidth />}
            />
          </div>
          <div className='date-wrap'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
                onChange={(val) =>  setDate(val) } 
                label="date of birth" 
                sx={{width:"100%"}}
              />

            </LocalizationProvider>
          </div>
        </div>

        <div>
          <TextField id="standard-basic" label="Address" variant="standard" onChange={(e) => setAddress(e.target.value)} fullWidth/>
        </div>

        <div className='line'>
          <div>
            <TextField
              label="Explain the symtoms"
              variant="outlined"
              fullWidth
              multiline
              rows={6}
              margin="normal"
              onChange={(e)=>setSymtoms(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="Detail the upcoming treatment plan"
              variant="outlined"
              fullWidth
              multiline
              rows={6}
              margin="normal"
              onChange={(e)=>setPlan(e.target.value)}
            />
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
    </div>
  )
}

export default Input

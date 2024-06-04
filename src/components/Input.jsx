import { useEffect, useState } from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { Autocomplete, Button, CircularProgress, TextField } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input'

import { onValue, ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

import { db, auth } from '../js/firebase'

const bloodType = ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-', 'A', 'B', 'O', 'AB']

function Input() {

  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [blood, setBlood] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [symtoms, setSymtoms] = useState('')
  const [plan, setPlan] = useState('')

  const [doctors, setDoctors] = useState([])
  const [info, setInfo] = useState({})
  const [selectedDoctor, setSelectedDoctor] = useState('')

  const [isLoaded, setIsLoaded] = useState(false)

  dayjs.extend(utc)
  dayjs.extend(timezone)

  // const userTZ = dayjs.tz.guess()
  const navigate = useNavigate()

  useEffect(() => {
    onValue(ref(db, 'doctors'), res => {
      setDoctors(Object.keys(res.val()))

      onValue(ref(db, 'info'), res => {
        setInfo(res.val())
        setIsLoaded(true)
      })
    })
  }, [])

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

    set(ref(db, '/patients/' + uid), {
      'paired-doctor-uid': selectedDoctor
    })
  }

  return (
    <>
      {isLoaded ?
        <div className='input-wrap'>
          <h1>Patient Registration</h1>

          <div className='form-wrap'>
            <div>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={doctors}
                onChange={(e, val) => setSelectedDoctor(val)}
                renderInput={(params) =>
                  <TextField {...params} 
                  label="Doctor who takes responsibilities for this patient"
                  fullWidth 
                  />}
              />
            </div>
            <div className='line'>
              <div>
                <TextField
                  id="standard-basic"
                  label="Full Name"
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
              </div>

              <MuiTelInput 
                value={contact} 
                onChange={(val) => setContact(val)} 
                label='contact' 
              />

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
                    onChange={(val) => setDate(val)}
                    label="date of birth"
                    sx={{ width: "100%" }}
                    format='DD/MM/YYYY'
                  />

                </LocalizationProvider>
              </div>
            </div>

            <div>
              <TextField
                id="standard-basic"
                label="Address"
                variant="standard"
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
              />
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
                  onChange={(e) => setSymtoms(e.target.value)}
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
                  onChange={(e) => setPlan(e.target.value)}
                />
              </div>
            </div>

            <div className='submit-wrap'>
              <Button 
                variant="contained" 
                color="success" 
                onClick={handleSubmit} 
                className='submit' sx={{
                    fontSize: '1em',
                    borderRadius: '10px'
                  }}>
                submit
              </Button>
            </div>
          </div>
        </div>
        :
        // not loaded yet
        <div className='circular-progress'>
          <CircularProgress />
        </div>
      }
    </>
  )

}

export default Input

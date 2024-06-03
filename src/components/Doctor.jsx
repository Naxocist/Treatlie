import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useOutlet } from 'react-router-dom'

import { auth, db } from '../js/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { ref, onValue } from 'firebase/database'

import PatientCard from './PatientCard'
import { CircularProgress } from '@mui/material'


function Doctor() {

  const [patientsUid, setPatientsUid] = useState([])
  const [usersInfo, setUsersInfo] = useState({})
  const [patientsInfo, setPatientsInfo] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  

  const navigate = useNavigate()
  const outletLoaded = useOutlet();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        onValue(ref(db, `doctors/${auth.currentUser.uid}/patient-list`), res => {
          const data = res.val()
          setPatientsUid(data)

          onValue(ref(db, 'info/'), res => {
            const data = res.val()
            setUsersInfo(data)

            onValue(ref(db, 'patients/'), res => {
              const data = res.val()
              setPatientsInfo(data)

              setIsLoaded(true)
            })
          })
    });
      } else {
        navigate('/')
        console.log("Error!")
      }
    })
  }, [])

  return (
    <>
      {isLoaded ?
        // loaded
        <div className='doc-wrap'>
          <section className='place-holder'></section>

          <section className='sidebar-wrap'>
            {
              patientsUid.map(uid => (
                <PatientCard key={uid} name={usersInfo[uid]['name']} uid={uid} />
              ))
            }
          </section>

          <section className='outlet-wrap'>
            { outletLoaded ?
                <Outlet context={{patientsInfo, usersInfo}}/>
                :
                <div className='not-loaded-wrap'>
                  <h1>Select a patient to observe his/her progress</h1>
                </div>
            }
          </section>
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

export default Doctor
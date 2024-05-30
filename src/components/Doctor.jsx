import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { auth, db } from '../js/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { ref, onValue } from 'firebase/database'

import PatientCard from './PatientCard'


function Doctor() {

  const [patientsUid, setPatientsUid] = useState([])
  const [usersInfo, setUsersInfo] = useState({})
  const [patientsInfo, setPatientsInfo] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  const navigate = useNavigate()

  
  function hookPatientList(uid) {
    onValue(ref(db, `doctors/${uid}/patient-list`), res => {
      const curPatientList = res.val()
      setPatientsUid(curPatientList)
    });
  }


  function hookUsersInfo() {
    onValue(ref(db, 'info/'), res => {
      const info = res.val()
      setUsersInfo(info)
      setIsLoaded(true)
    })
  }


  function hookPatients() {
    onValue(ref(db, 'patients/'), res => {
      const patients = res.val()
      setPatientsInfo(patients)
    })
  }


  useEffect(() => {

    setIsLoaded(false)
    hookUsersInfo()

    onAuthStateChanged(auth, user => {
      if (user) {
        hookPatientList(user.uid)
        hookPatients()

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
          <section className='sidebar-wrap'>
            <div>
              {
                patientsUid.map(uid => (
                  <PatientCard key={uid} name={usersInfo[uid]['name']} uid={uid} />
                ))
              }
            </div>
          </section>
          <section className='outlet-wrap'>
            <Outlet context={{patientsInfo, usersInfo}}/>
          </section>
        </div> 
        :
        // not loaded yet
        <div>
        </div>
      }
    </>
  )
}

export default Doctor
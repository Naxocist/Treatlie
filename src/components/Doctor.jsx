import React, { useState, useEffect } from 'react'
import { auth, db } from '../js/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, set, onValue } from 'firebase/database';

import PatientCard from './PatientCard.jsx';


function Doctor() {

  const [patientsUid, setPatientsUid] = useState([])
  const [usersInfo, setUsersInfo] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  function hookPatientList(uid) {
    onValue(ref(db, `doctors/${uid}/patient-list`), res => {
      const curPatientList = res.val();

      setPatientsUid(curPatientList)
    });
  }

  function hookUsersInfo() {
    onValue(ref(db, 'info/'), res => {
      const info = res.val();
      // console.log(info)
      setUsersInfo(info)
    })
  }

  useEffect(() => {

    onAuthStateChanged(auth, user => {
      if (user) {
        const uid = user.uid;

        hookPatientList(uid)
        hookUsersInfo()

        setIsLoaded(true)

      } else {
        location.assign('/')
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
                  <PatientCard name={usersInfo[uid]['name']}/>
                ))
              }
            </div>
          </section>
          <section className='events-wrap'>
            events
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
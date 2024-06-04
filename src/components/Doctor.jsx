import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useOutlet } from 'react-router-dom'

import { auth, db } from '../js/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { ref, onValue } from 'firebase/database'

import PatientCard from './PatientCard'
import { CircularProgress } from '@mui/material'

import { motion } from 'framer-motion'

function Doctor() {

  const [patientsUid, setPatientsUid] = useState(null)
  const [usersInfo, setUsersInfo] = useState(null)
  const [patientsInfo, setPatientsInfo] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  

  const navigate = useNavigate()
  const outletLoaded = useOutlet();


  const handleChat = () => {
    const currentUserId = auth.currentUser.uid;
    navigate(`/doctorchat/${currentUserId}`);
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {

        onValue(ref(db, `doctors/${auth.currentUser.uid}/patient-list`), res => {
          const data = res.val()
          setPatientsUid(data)

        });

        onValue(ref(db, 'info/'), res => {
          const data = res.val()
          setUsersInfo(data)

        })

        onValue(ref(db, 'patients/'), res => {
          const data = res.val()
          setPatientsInfo(data)

        })
      } else {
        navigate('/')
        console.log("Error!")
      }
    })
  }, [])

  useEffect(() => {

    if(!usersInfo || !patientsUid || !patientsInfo) return 

    // console.log(usersInfo)
    // console.log(patientsUid)
    // console.log(patientsInfo)

    setIsLoaded(true)

  }, [usersInfo, patientsUid, patientsInfo])

  return (
    <motion.div

      initial={{opacity: 0}}
      animate={{opacity: 1, transition: {duration: 1}}}
      exit={{opacity: 0}}
    >
      {isLoaded ?
        // loaded
        <div className='doc-wrap'>
          <section className='place-holder'></section>

          <section className='sidebar-wrap'>
            {
              Object.keys(patientsUid).map(uid => (
                <PatientCard key={uid} name={usersInfo[uid]['name']} uid={uid} />
              ))
            }
          </section>

          <section className='outlet-wrap'>
            { outletLoaded ?
                <Outlet context={{patientsInfo, usersInfo}}/>
                :
                <div className='not-loaded-wrap'>
                  <h1>Select a patient to view his/her profile</h1>
                </div>
            }
          </section>


          <div>
            <button className="chat-button" onClick={() => handleChat()}>Chat with Patient</button>
          </div>
        </div> 
        :
        // not loaded yet
        <div className='circular-progress'>
          <CircularProgress />
        </div>
      }
    </motion.div>
  )
}

export default Doctor
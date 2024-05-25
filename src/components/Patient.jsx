import React, { useEffect } from 'react'
import { auth } from '../js/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Patient() {
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(user) {
        console.log(user.uid)
      }else {
        location.assign('/')
        console.log("Error!")
      }
    })
  }, [])

  return (
    <div>Patient</div>
  )
}

export default Patient
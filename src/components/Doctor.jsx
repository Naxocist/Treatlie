import React, { useEffect } from 'react'
import { auth } from '../js/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Doctor() {

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log(user.uid)
      } else {
        location.assign('/')
        console.log("Error!")
      }
    })
  }, [])

  return (
    <div>Doctor</div>
  )
}

export default Doctor
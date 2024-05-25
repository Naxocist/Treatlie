import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../js/firebase'


function Options() {

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
    <>
      <h1 className='who-r-u'>Who are you?</h1>

      <div className='options-card'>
        <div>
          <button>
            <Link to='../patient' >patient</Link>
          </button>
        </div>

        <div className='or'>
          <p>or</p>
        </div>

        <div>
          <button>
            <Link to='../doctor'>doctor</Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default Options
import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../js/firebase';

function Options() {
  return (
    <>
      <h1 className='who-r-u'>Who are you?</h1>

      <div className='options-card'>
        <div>
          <Link to='../patient' className='pressing'>Patient</Link>
        </div>

        <div>
          <p>or</p>
        </div>

        <div>
          <Link to='../doctor'>Doctor</Link>
        </div>
      </div>
    </>
  )
}

export default Options
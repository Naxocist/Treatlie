import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../js/firebase'


function Options() {

  const navigate = useNavigate()

  const [uid, setUid] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(user) {
        setUid(user.uid)
      }else {
        navigate('/')
      }
    })
  }, [])

  if(!uid) 

  return (
    <>
      <h1 className='who-r-u'>Who are you?</h1>

      <div className='options-card'>
        <div>
          <button>
            <Link to={`../patient/${uid}`} >patient</Link>
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
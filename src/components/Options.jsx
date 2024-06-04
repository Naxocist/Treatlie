import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
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
    <motion.div 
      className='center-wrap'

      initial={{opacity: 0}}
      animate={{opacity: 1, transition: {duration: 1}}}
      exit={{opacity: 0}}
    >
      <h1 className='who-r-u'>Who are you?</h1>

      <div className='options-card'>
        <div>
          <button className='btn'>
            <Link to='../patient' >patient</Link>
          </button>
        </div>

        <div className='or'>
          <p>or</p>
        </div>

        <div>
          <button className='btn'>
            <Link to='../doctor'>doctor</Link>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Options
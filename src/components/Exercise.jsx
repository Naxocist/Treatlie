
import { remove, ref } from 'firebase/database'
import { db } from '../js/firebase'

import { motion } from 'framer-motion'
function Exercise({uid, hash, exName, status, removeMode}) {

  const handleRemovePacket = () => {
      const confirmed = window.confirm(`You are deleting a packet. This process can't be undone. \nAre you sure?`)

      if(confirmed) {
        // remove an exercise
        remove(ref(db, `patients/${uid}/packets/${hash}/exercises/${exName}`))
      }
  }

  const done = status['done']
  const goal = status['goal']
  // console.log(status)

  return (
    <div>
      {removeMode ?
        <div onClick={handleRemovePacket} className='outer-wrap'>
          <div className='list-rm-wrap'>
            <p>{exName}</p>
            <p>{done} / {goal}</p>
          </div>
        </div>
        :
        <div className='outer-wrap'>
          <div className='list-nm-wrap'>
            <p>{exName}</p>
            <p>{done} / {goal}</p>
          </div>
        </div>
      }
    </div>
  )
}

export default Exercise

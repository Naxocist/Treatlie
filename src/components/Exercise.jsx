
import { remove, ref } from 'firebase/database'
import { db } from '../js/firebase'

import { ISOtoString } from '../js/utils'

function Exercise({uid, hash, exName, status, removeMode}) {

  const handleRemovePacket = () => {
      const confirmed = window.confirm(`You are deleting a packet. This process can't be undone. \nAre you sure?`)

      if(confirmed) {
        // remove an exercise
        remove(ref(db, `patients/${uid}/packets/${hash}/exercises/${exName}`))
      }
  }

  return (
    <>
      {removeMode ?
        <button className='btn-reset btn-remove' onClick={handleRemovePacket}>
          <div className='packet-wrap exercise-wrap'>
            {exName}
          </div>
        </button>
        :
        <button className='btn-reset'>
          <div className='packet-wrap'>
            {exName}
          </div>
        </button>
      }
    </>
  )
}

export default Exercise

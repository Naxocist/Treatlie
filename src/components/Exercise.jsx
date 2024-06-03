
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
        <button onClick={handleRemovePacket} className='list-rm-wrap btn-reset'>
          <div>
            {exName}
          </div>
        </button>
        :
        <button className='list-nm-wrap btn-reset'>
          <div>
            {exName}
          </div>
        </button>
      }
    </>
  )
}

export default Exercise

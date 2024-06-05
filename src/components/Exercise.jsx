
import { remove, ref, update, increment } from 'firebase/database'
import { db } from '../js/firebase'

function Exercise({uid, hash, exName, status, removeMode, finished}) {

  const handleRemovePacket = () => {
      const confirmed = window.confirm(`You are deleting a packet. This process can't be undone. \nAre you sure?`)

      if(confirmed) {
        // remove an exercise
        remove(ref(db, `patients/${uid}/packets/${hash}/exercises/${exName}`))
        const updates = {}
        updates[`patients/${uid}/packets/${hash}/status/goal`] = increment(-1)

        if(status.done >= status.goal) {
          updates[`patients/${uid}/packets/${hash}/status/done`] = increment(-1)
        }
        update(ref(db), updates);
      }
  }

  const done = status['done']
  const goal = status['goal']
  // console.log(status)

  return (
    <div>
      {removeMode ?
        <div onClick={handleRemovePacket} className='outer-wrap'>
          <div className={`list-rm-wrap ${finished ? 'list-hover' : ''}`} >
            <p>{exName}</p>
            <p>{done} / {goal}</p>
          </div>
        </div>
        :
        <div className='outer-wrap'>
          <div className={`list-nm-wrap ${finished ? 'list-hover' : ''}`} >
            <p>{exName}</p>
            <p>{done} / {goal}</p>
          </div>
        </div>
      }
    </div>
  )
}

export default Exercise

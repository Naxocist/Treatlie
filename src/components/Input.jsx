import { useState } from 'react'

function Input() {

  const [name, setName] = useState('')
  
  return (
    <div className='input-wrap'>
      <div>
        <input type='text'></input>
      </div>
      <div>
        <input type='date'></input>
      </div>
    </div>
  )
}

export default Input

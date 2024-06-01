import { Link } from 'react-router-dom'

function Options() {
  return (
    <div className='center-wrap'>
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
    </div>
  )
}

export default Options
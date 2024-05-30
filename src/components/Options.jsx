import { Link } from 'react-router-dom'

function Options() {
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
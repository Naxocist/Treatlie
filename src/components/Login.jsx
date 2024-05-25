import { Link } from 'react-router-dom'

import reactLogo from '../assets/react.svg'

import { auth } from '../js/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'


function Login() {

  const handleGoogle = async () => {

    const provider = await new GoogleAuthProvider
    await signInWithPopup(auth, provider)

    location.assign('/options')
  }

  return (
    <>
      <div>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo' alt='React logo' />
        </a>
      </div>

      <h1 className='title'>Treatlie</h1>


      <div className='card'>
        <button onClick={handleGoogle}>
          Login with Google
        </button>
      </div>

      <p className='description'>
        Enhances medical communication experiences
      </p>
    </>
  )
}

export default Login
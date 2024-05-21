import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Login.css'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../ts/firebase'

function Login() {

  const handleGoogle = () => {
    const provider = new GoogleAuthProvider
    return signInWithPopup(auth, provider)
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Treatlie</h1>
      <div className="card">
        <button onClick={ handleGoogle }>
          Login with Google
        </button>
        <p>
        </p>
      </div>
      <p className="read-the-docs">
        Enhances communication between doctors and patiences 
      </p>
    </>
  )
}

export default Login

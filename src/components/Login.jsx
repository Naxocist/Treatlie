import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../css/Login.css'
import { auth } from '../js/firebase'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export default function Login() {

  const handleGoogle = async () => {
    const provider = await new GoogleAuthProvider
    return signInWithPopup(auth, provider)
  }

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Treatlie</h1>


      <div className="card">
        <button onClick={handleGoogle}>
          Login with Google
        </button>
      </div>

      <p className="description">
        Enhances medical communication experiences
      </p>
    </>
  )
}


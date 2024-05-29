import reactLogo from '../assets/react.svg'

import { auth, db } from '../js/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { get, ref } from 'firebase/database'


function Login() {

  const handleGoogle = async () => {

    const provider = await new GoogleAuthProvider
    await signInWithPopup(auth, provider)

    const uid = auth.currentUser.uid;
    console.log(uid)

    get(ref(db, 'info/' + uid)).then( (res) => {
      if (res.exists()) {
        // existing user

        const info = res.val();
        // console.log(value);

        if (info.role == "admin") {
          return location.assign('/options')
        }

        if(info.role == "patient") {
          return location.assign('/patient')
        }

        if(info.role == "doctor") {
          return location.assign('/doctor')
        }

      } else {
        // New user
        console.log("New user")

        return location.assign('/Input')
      }
    }).catch((error) => {
      console.error(error);
    });
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
import { useNavigate } from 'react-router-dom'
import reactLogo from '../assets/react.svg'

import { auth, db } from '../js/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { get, ref } from 'firebase/database'


function Login() {

  const navigate = useNavigate()

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

        if (info.role == "admin") 
          navigate('options')
        

        if(info.role == "patient") 
          navigate('patient')

        if(info.role == "doctor") 
          navigate('doctor')

      } else {
        // New user
        console.log("New user")

        navigate('input')
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <div className='center-wrap'>
      <div>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo' alt='React logo' />
        </a>
      </div>

      <h1 className='title'>Treatlie</h1>


      <div className='card'>
        <button className='btn' onClick={handleGoogle}>
          Login with Google
        </button>
      </div>

      <p className='desc-login'>
        Enhances medical communication experiences
      </p>
    </div>
  )
}

export default Login
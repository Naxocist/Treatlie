import { useNavigate } from 'react-router-dom'
import Treatlie from '../assets/Treatlie-without-name.svg'
import TreatlieName from '../assets/Treatlie-with-name.svg'
import TreatlieTxt from '../assets/Treatlie-txt.svg'

import { auth, db } from '../js/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { get, ref } from 'firebase/database'

import { motion } from 'framer-motion'

import google from '../assets/google.png'


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

        if (info.role == 'admin') 
          navigate('options')
        

        if(info.role == 'patient') 
          navigate('patient')

        if(info.role == 'doctor') 
          navigate('doctor')

      } else {
        // New user
        console.log('New user')

        navigate('input')
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <motion.div className='center-wrap'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0 }}
    >
      {/* <a href='https://react.dev' target='_blank'> */}
      <a>
        <img src={Treatlie} className='logo' alt='Treatlie logo' />
      </a>

      <a>
        <img src={TreatlieTxt} className='text' alt='Treatlie text' />
      </a>

      <div className='card'>
        <button className="google-login-button" onClick={handleGoogle}>
          <img
            // src="https://developers.google.com/identity/images/g-logo.png"
            src={google}
            alt="Google Logo"
            className="google-logo"
          />
          Sign in with Google
        </button>
      </div>

      <p className='desc-login'>
        Enhances medical communication experiences
      </p>
    </motion.div>
  )
}

export default Login
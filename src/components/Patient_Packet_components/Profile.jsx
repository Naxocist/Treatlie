import unknown from "./../../../public/unknown.jpg"
import { db } from "./../../js/firebase.js"
import { ref, onValue } from "firebase/database"
import { useEffect } from "react";

function Profile() {
  
  return(
    <div className='tp-wrap'>
      <div className='pfp-wrap'>
        <img className='pfp' src={unknown}></img>
      </div>

      <div className='info-wrap'>
        <h1>name</h1>
        <div className='below-info-wrap'>
          <h3 className='birth-date'>birthdate</h3>
          <h3>age</h3>
        </div>
      </div>
    </div>
  );
}

export default Profile;
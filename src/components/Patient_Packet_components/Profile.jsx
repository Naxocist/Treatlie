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
        <h1>Patient A</h1>
        <div className='below-info-wrap'>
          <p>Birth of date: 5/6/2017</p>
          <p>Age: 7</p>
        </div>
        <div className='below-info-wrap'>
          <p>Blood type: O+</p>
          <p>Contact: +66 062 939 3828</p>
        </div>
        <div className='below-info-wrap'>
          <p>Address: 239/21 Melon Street</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
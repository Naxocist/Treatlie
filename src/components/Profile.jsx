import { useOutletContext, useParams } from 'react-router-dom'

import unknown from '../assets/unknown.jpg'


function calculateAge(birthdayString) {
  const [year, month, day] = birthdayString.split('-').map(Number);
  
  const birthday = new Date(year, month - 1, day); 
  
  const today = new Date();
  
  let age = today.getFullYear() - birthday.getFullYear();
  
  const monthDifference = today.getMonth() - birthday.getMonth();
  const dayDifference = today.getDate() - birthday.getDate();
  
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }
  
  return age;
}

function Profile() {
  const params = useParams()
  const { patientsInfo, usersInfo } = useOutletContext()

  const uid = params.uid;
  const name = usersInfo[uid]['name']
  const birthdate = usersInfo[uid]['birth-date']
  const age = calculateAge(birthdate)


  return (
    <>
      <div className='tp-wrap'>
          <div className='pfp-wrap'>
            <img className='pfp' src={unknown}></img>
          </div>

          <div className='info-wrap'>
            <h1>{name}</h1>
            <div className='below-info-wrap'>
              <h3 className='birth-date'>{birthdate}</h3>
              <h3>{age}</h3>
            </div>
          </div>
      </div>

      <div className='ex-wrap'>
        <h1 className='ex-head'>Exercise list</h1>

        <div className='ex-content-wrap'>
          {
            patientsInfo[uid] === undefined ?
              <></>
              :
              patientsInfo[uid]['current-exercises-list'].map(ele => (
                <div key={ele} className='ex-card'>
                  <h2>{ele}</h2>
                  <img></img>
                </div>
              ))
          }
        </div>
      </div>

    </>
  )
}

export default Profile;
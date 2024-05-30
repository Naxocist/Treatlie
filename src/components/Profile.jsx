import { useOutletContext, useParams } from 'react-router-dom'


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

  console.log(patientsInfo)

  return (
    <div className='pf-wrap'>
      <h1>{name}</h1>
      <img className='pfp' src='https://yt3.googleusercontent.com/33C0tSz8peW_ADjznlH98jC0dbc6kU6GvHtxgSNU2PlbzFYLsWzxxYlQ239bFUAwYJkoaXDi=s900-c-k-c0x00ffffff-no-rj'></img>

      <h4>{birthdate}</h4>
      <h4>{age}</h4>

      <div className='ex-wrap'>

        {
          patientsInfo[uid] === undefined ? 
            <></>
            :
            patientsInfo[uid]['current-exercises-list'].map( ele => (
              <div className='ex-card'>
                <h2>{ele}</h2>
                <img></img>
              </div>
            ))
        }
      </div>

    </div>
  )
}

export default Profile;
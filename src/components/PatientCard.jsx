import { NavLink } from 'react-router-dom'

function PatientCard({name, uid}) {

  return (
      <NavLink to={'profile/' + uid}> 
        <div className='p-card'>
          {name}
        </div>
      </NavLink>
  )
}

export default PatientCard

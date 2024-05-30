import { NavLink } from 'react-router-dom'

function PatientCard({name, uid}) {

  return (
    <div>
      <NavLink to={'profile/' + uid} className='p-list'> 
        {name}
      </NavLink>
    </div>
  )
}

export default PatientCard

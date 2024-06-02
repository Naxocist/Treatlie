import { useNavigate } from "react-router-dom"
import { auth } from "../js/firebase"

function Exercise({exName, status, removeMode}) {
  const navigate = useNavigate()

  const uid = auth.currentUser.uid
  if(!uid) {
    navigate('/')
  }

  return (
    <div>{exName}</div>
  )
}

export default Exercise

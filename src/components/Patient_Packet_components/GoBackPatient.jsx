import { useParams, useNavigate } from "react-router-dom";

function GoBackPatient() {
  const link = useParams();
  const navigate = useNavigate();
  console.log(link);
  console.log(Object.keys(link).length);

  const enableGoBack = () => {
    if(Object.keys(link).length === 3) {
      navigate(`/patient/${link.patient_id}/tasks/${link.packet_id}`);
    }else if(Object.keys(link).length === 2) {
      navigate(`/patient/${link.patient_id}`);
    }
  }
  return(
    <>
      <div className="go_back" onClick={enableGoBack}>
        Back
      </div>
    </>
  );
}

export default GoBackPatient;
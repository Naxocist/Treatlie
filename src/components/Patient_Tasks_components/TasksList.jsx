import React, {useEffect, useState} from 'react'
import { db } from "../../js/firebase.js"
import { ref, onValue } from "firebase/database"
import { useParams, Link } from 'react-router-dom'


function TasksList() {
  const [tasks, setTasks] = useState({});
  let packet = useParams();
  const patient_id = useParams().patient_id;
  useEffect(() => {
    onValue(ref(db, `patients/${patient_id}/packets/${packet.packet_id}/`), res => {
      const datas = res.val().exercises;
      if(datas) {
        setTasks(datas);
      }
    });
  }, []);

  const success = (key) => {
    let stat;
    onValue(ref(db, `patients/${patient_id}/packets/${packet.packet_id}/exercises/${key}`), res => {
      const datas = res.val();
      if(datas.done == 0) {
        stat = "each_packet";
      }else if(datas.done >= datas.goal) {
        stat = "yes";
      }else {
        stat = "no";
      }
    });
    return stat;
  }

  return(
    <div>
      <div className="patient-tp-wrap">
        <h1 className="packet-title">Exercises</h1>
      </div>
      <hr/>
      <div className="packet">
        <div className="packet_list">
          {Object.entries(tasks).map(([key, value], index) => 
            <Link to={`webcam/${key}`} className="link">  
              <div key={index} className={success(key)}>
                <img src={"/muscle.svg"} className="pic"/>
                <span className="packet_name">{key}</span>
                <span className="stat">( {value.done} / {value.goal} )</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default TasksList;
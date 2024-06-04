import React, {useEffect, useState} from 'react'
import { db } from "./../../js/firebase.js"
import { ref, onValue } from "firebase/database"
import { Link, useParams } from 'react-router-dom'
import { ISOtoString, convertDeadline } from "./../../js/utils.js"

function PacketList() {
  const [packets, setPackets] = useState({});
  const patient_id = useParams().patient_id;
  console.log(patient_id);
  useEffect(() => {
    onValue(ref(db, `patients/${patient_id}`), res => {
      const data = res.val();
      const packets = data['packets']

      if(!packets) {
        console.log("error")
        return 
      }

      setPackets(packets);
    });
  }, []);

  const success = (key) => {
    let stat;
    onValue(ref(db, `patients/${patient_id}/packets/${key}/status`), res => {
      const data = res.val();
      // console.log(datas);
      if(data.done == 0) {
        stat = "each_packet";
      }else if(data.done >= data.goal) {
        stat = "yes";
      }else {
        stat = "no";
      }
    });
    return stat;
  }

  return(
    <div>
      <h1 className="packet-title">Exercise Packets</h1>
      <hr/>
      <div className="packet">
        <div className="packet_list">

          {Object.entries(packets).map(([key, value]) => 

            <Link to={`tasks/${key}`} key={key} className="link">
              <div key={key} className={success(key)}>
                <img src={"/muscle.svg"} className="pic"/>
                <span className="packet_name">Assigned on {ISOtoString(value.created)} Due {convertDeadline(value.deadline)}</span>
                <span className="stat">( {value.status.done} / {value.status.goal} )</span>
              </div>
            </Link>

          )}
        </div>
      </div>
    </div>
  );
}

export default PacketList;
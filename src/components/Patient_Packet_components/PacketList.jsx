import React, {useEffect, useState} from 'react'
import { db } from "./../../js/firebase.js"
import { ref, onValue } from "firebase/database"
import { Link } from 'react-router-dom';

function PacketList() {
  const [packets, setPackets] = useState({});
  useEffect(() => {
    onValue(ref(db, `patients/baoid/packets`), res => {
      const datas = res.val();
      setPackets(datas);
    });
  }, []);

  const success = (key) => {
    let stat;
    onValue(ref(db, `patients/baoid/packets/${key}/status`), res => {
      const datas = res.val();
      console.log(datas);
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
    <div className="packet">
      <div className="packet_list">
        {Object.entries(packets).map(([key, value], index) => 
          <Link to={`tasks/${key}`} key={key} className="link">
            <div key={index} className={success(key)}>
              <img src={"/muscle.svg"} className="pic"/>
              <span className="packet_name">{value.created}</span>
              <span className="stat">( {value.status.done} / {value.status.goal} )</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default PacketList;
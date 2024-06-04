import React, {useEffect, useState} from 'react'
import { db } from "./../../js/firebase.js"
import { ref, onValue } from "firebase/database"

function NumPacketDone() {
  const [done, setDone] = useState(0);
  const [goal, setGoal] = useState(0);

  useEffect(() => {
    onValue(ref(db, `patients/baoid/packets`), res => {
      const datas = res.val();
      if(datas) {
        let newGoal = 0;
        let newDone = 0;
        Object.values(datas).map((data) => {
          newGoal += 1;
          if(data.status.done >= data.status.goal) {
            newDone += 1;
          }
        });
        setGoal(newGoal);
        setDone(newDone);
      }else {
        console.log("error");
      }
    });
  }, []);

  return (
    <section className="text">
      <div>
        <p>Task Done</p>
      </div>
      <div className="done">
        {done}/{goal}
      </div>
    </section>
  );

}
export default NumPacketDone;
import React, {useEffect, useState} from 'react'
import { auth, db } from "./../../js/firebase.js"
import { ref, onValue } from "firebase/database"
import { onAuthStateChanged } from 'firebase/auth';

function NumPacketDone() {
  const [done, setDone] = useState(0);
  const [goal, setGoal] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        onValue(ref(db, `patients/${user.uid}`), res => {
          const data = res.val();
          const packets = data['packets']

          if (packets) {
            let newDone = 0;
            let newGoal = 0;
            Object.values(packets).map( data => {
              newGoal += 1;
              if(data.status.done && data.status.done >= data.status.goal) {
                newDone += 1;
              }
            });

            setGoal(newGoal);
            setDone(newDone);
          } else {
            console.log("error");
          }
        });
      } else {
        navigate('/')
      }
    })

  }, []);

  return (
    <section className="text">
      <div>
        <p>Packets Done</p>
      </div>
      <div className="done">
        {done}/{goal}
      </div>
    </section>
  );

}
export default NumPacketDone;
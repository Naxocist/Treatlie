// ท่านั่งเตะขาขวา
// Sit and kick your right leg.

import { Dis } from "./../Cal/Dis.jsx"
import { Angle } from "./../Cal/Angle.jsx"

export function Posture3(coor) {
  let pos24, pos26, pos28;
  try {
    pos24 = coor[0][24];
    pos26 = coor[0][26];
    pos28 = coor[0][28];
  } catch(error) {
    return false;
  }

  if(pos24 === undefined || pos26 === undefined || pos28 === undefined ) {
    return false;
  }

  const angle26 = Angle(Dis(pos24, pos26), Dis(pos26, pos28), Dis(pos24, pos28)) * 180 / Math.PI;

  console.log("------");
  console.log(angle26);
  console.log("------");

  if(angle26 <= 45) {
    return 1;
  }else if(angle26 >= 160) {
    return 2;
  }else {
    return 0;
  }
}
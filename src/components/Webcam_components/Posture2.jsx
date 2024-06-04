// ท่านั่งเตะขาซ้าย
// Sit and kick your left leg.

import { Dis } from "./../Cal/Dis.jsx"
import { Angle } from "./../Cal/Angle.jsx"

export function Posture2(coor) {
  let pos23, pos25, pos27;
  try {
    pos23 = coor[0][23];
    pos25 = coor[0][25];
    pos27 = coor[0][27];
  } catch(error) {
    return false;
  }

  if(pos23 === undefined || pos25 === undefined || pos27 === undefined ) {
    return false;
  }

  const angle25 = Angle(Dis(pos23, pos25), Dis(pos25, pos27), Dis(pos23, pos27)) * 180 / Math.PI;

  console.log("------");
  console.log(angle25);
  console.log("------");

  if(angle25 <= 45) {
    return 1;
  }else if(angle25 >= 160) {
    return 2;
  }else {
    return 0;
  }
}
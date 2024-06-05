// right open
import { Dis } from "./../Cal/Dis.jsx"
import { Angle } from "./../Cal/Angle.jsx"

export function Posture4(coor) {
  let pos14, pos12, pos24;
  try {
    pos14 = coor[0][14];
    pos12 = coor[0][12];
    pos24 = coor[0][24];
  } catch(error) {
    return 0;
  }

  if(pos14 === undefined || pos12 === undefined || pos24 === undefined ) {
      return 0;
    }

  const angle12 = Angle(Dis(pos14, pos12), Dis(pos14, pos24), Dis(pos14, pos24)) * 180 / Math.PI;

  console.log(angle12)
  console.log("------")

  if(angle12 <= 53 && angle12 <= 53) {
    return 1;
  }else if(angle12 >= 70 && angle12 >= 70) {
    return 2;
  }else {
    return 0;
  }
}
// left open
import { Dis } from "./../Cal/Dis.jsx"
import { Angle } from "./../Cal/Angle.jsx"

export function Posture5(coor) {
  let pos13, pos11, pos23;
  try {
    pos13 = coor[0][13];
    pos11 = coor[0][11];
    pos23 = coor[0][23];
  } catch(error) {
    return 0;
  }

  if(pos13 === undefined || pos11 === undefined || pos23 === undefined ) {
      return 0;
    }

  const angle11 = Angle(Dis(pos13, pos11), Dis(pos13, pos23), Dis(pos13, pos23)) * 180 / Math.PI;

  console.log(angle11)
  console.log("------")

  if(angle11 <= 53 && angle11 <= 53) {
    return 1;
  }else if(angle11 >= 70 && angle11 >= 70) {
    return 2;
  }else {
    return 0;
  }
}
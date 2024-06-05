// ท่ายกแขนเหนือศีรษะ
// Raising arms above head

import { Dis } from "./../Cal/Dis.jsx"
import { Angle } from "./../Cal/Angle.jsx"

export function Posture1(coor) {
  let pos16, pos14, pos12, pos15, pos13, pos11;
  try {
    pos16 = coor[0][16];
    pos14 = coor[0][14];
    pos12 = coor[0][12];

    pos15 = coor[0][15];
    pos13 = coor[0][13];
    pos11 = coor[0][11];
  } catch(error) {
    return 0;
  }

  if(pos16 === undefined || pos14 === undefined || pos12 === undefined || 
    pos15 === undefined || pos13 === undefined || pos11 === undefined) {
      return 0;
    }

  const angle14 = Angle(Dis(pos14, pos16), Dis(pos14, pos12), Dis(pos12, pos16)) * 180 / Math.PI;
  const angle13 = Angle(Dis(pos13, pos15), Dis(pos13, pos11), Dis(pos11, pos15)) * 180 / Math.PI;

  console.log("------")
  console.log(angle14)
  console.log(angle13)
  console.log("------")

  if(angle13 <= 10 && angle14 <= 10) {
    return 1;
  }else if(angle13 >= 160 && angle14 >= 160) {
    return 2;
  }else {
    return 0;
  }
}
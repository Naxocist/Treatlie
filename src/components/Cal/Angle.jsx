export function Angle(BA, BC, AC) {
  // return angle B
  return Math.acos((Math.pow(BA,2) + Math.pow(BC,2) - Math.pow(AC,2)) / (2*BA*BC));
}
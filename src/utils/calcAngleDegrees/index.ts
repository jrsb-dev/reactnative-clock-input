/**
 * calcAngleDegrees @param x
 */
export function calcAngleDegrees(x: number, y: number) {
  return (Math.atan2(y, x) * 180) / Math.PI;
}

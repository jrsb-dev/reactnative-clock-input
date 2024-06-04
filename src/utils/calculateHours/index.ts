/**
 * calculate hours based on angle
 */
export default function calculateHours(
  dx: number,
  dy: number,
  radius: number,
  angle: number,
  ringTreshold: number = 0.75,
) {
  const angleLength = Math.sqrt(dx * dx + dy * dy); // length of the clockface
  const angleLengthPercentage = angleLength / radius; // needed to check if user is selecting in inner or outer ring

  const v = Math.round(angle / 30) % 12;
  if (angleLengthPercentage > ringTreshold) {
    // outer hour ring, 13 - 00
    return v === 0 ? 0 : v + 12;
  } else {
    // inner hour ring, 1 - 12
    return v === 0 ? 12 : v;
  }
}

/**
 * generate number of minutes based on angle
 * @param angle
 * @param coarseMinutes capping on the minutes e.g. 5, 15, 30
 */
export default function calculateMinutes(angle: number, coarseMinutes = 5) {
  return (
    (Math.round(Math.round(angle / 6) / coarseMinutes) * coarseMinutes) % 60
  );
}

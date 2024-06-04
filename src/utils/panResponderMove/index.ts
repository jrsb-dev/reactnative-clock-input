import { calcAngleDegrees } from "../calcAngleDegrees";
import parseDisabledTimeRange from "../parseDisabledTimeRange";
import calculateHours from "../calculateHours";
import isTimeAllowed from "../isTimeAllowed";
import calculateMinutes from "../calculateMinutes";
import parseTimeString from "../parseTimeString";

export default function panResponderMove({
  locationX,
  locationY,
  elemWidth,
  elemHeight,
  isSelectingHour,
  disabledTimeRange,
  time,
}) {
  const radius = elemWidth / 2;
  const { hours, minutes } = parseTimeString(time);

  const dx = locationX - elemWidth / 2;
  const dy = locationY - elemHeight / 2;

  // adding 90 degrees seems like a magic number, but clocks are actually rotated 90 degrees.
  let angle = calcAngleDegrees(dx, dy) + 90;

  if (angle < 0) {
    angle += 360;
  }

  const parsedDisableTimeRange = parseDisabledTimeRange(disabledTimeRange);

  if (isSelectingHour) {
    const hours = calculateHours(dx, dy, radius, angle);

    if (isTimeAllowed(hours, minutes, parsedDisableTimeRange))
      return {
        hours,
        minutes,
        time: [hours, minutes].join(":"),
      };
  } else {
    const minutes = calculateMinutes(angle);

    if (isTimeAllowed(hours, minutes, parsedDisableTimeRange))
      return {
        hours,
        minutes,
        time: [hours, minutes].join(":"),
      };
  }
}

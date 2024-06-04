import parseDisabledTimeRange from "../parseDisabledTimeRange";

/**
 * isTimeAllowed
 * checks time against a disabled time range
 */
export default function isTimeAllowed(
  hours: number,
  minutes: number,
  parsedDisableTimeRange: ReturnType<typeof parseDisabledTimeRange>,
) {
  if (!parsedDisableTimeRange) return true;

  // Zet de uren en minuten van de tijdrange om in minuten sinds middernacht
  const fromTotalMinutes =
    parsedDisableTimeRange.fromHours * 60 + parsedDisableTimeRange.fromMinutes;
  const toTotalMinutes =
    parsedDisableTimeRange.toHours * 60 + parsedDisableTimeRange.toMinutes;
  const timeTotalMinutes = hours * 60 + minutes;

  // Check if time is in range
  if (fromTotalMinutes <= toTotalMinutes) {
    return (
      timeTotalMinutes >= fromTotalMinutes && timeTotalMinutes <= toTotalMinutes
    );
  } else {
    // If range is over midnight
    return (
      timeTotalMinutes >= fromTotalMinutes || timeTotalMinutes <= toTotalMinutes
    );
  }
}

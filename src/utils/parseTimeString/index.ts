/**
 * parse time string to state
 * @param {string} time in format HH:MM
 */
export default function parseTimeString(time: string) {
  try {
    const [hours, minutes] = time.split(":");

    if (hours === undefined || minutes === undefined) {
      throw new Error("Invalid time format");
    }

    const parsedHours = parseInt(hours, 10);
    const parsedMinutes = parseInt(minutes, 10);

    if (isNaN(parsedHours) || isNaN(parsedMinutes)) {
      throw new Error("Parsed values are NaN");
    }

    return { hours: parsedHours, minutes: parsedMinutes };
  } catch (e) {
    console.warn("Cannot parse current time as valid time", e);
    return { hours: 0, minutes: 0 };
  }
}

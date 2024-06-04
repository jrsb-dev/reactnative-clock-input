/**
 * Disabled time ranges from react-timekeeper
 * e.g. {from: 15:30, to: 19:30}
 */
export interface DisabledTimeRange {
  from: string;
  to: string;
}

/**
 * parse disabled time ranges
 */
export default function parseDisabledTimeRange(
  disabledTimeRange: DisabledTimeRange,
) {
  if (!disabledTimeRange) return undefined;
  try {
    const { from, to } = disabledTimeRange;
    const fromHours = parseInt(from.split(":")[0], 10);
    const fromMinutes = parseInt(from.split(":")[1], 10);
    const toHours = parseInt(to.split(":")[0], 10);
    const toMinutes = parseInt(to.split(":")[1], 10);

    if (
      isNaN(fromHours) ||
      isNaN(fromMinutes) ||
      isNaN(toHours) ||
      isNaN(toMinutes)
    ) {
      throw new Error("Parsed values are NaN");
    }

    return { fromHours, fromMinutes, toHours, toMinutes };
  } catch (e) {
    console.warn("You are trying to use an unparsable DisabledTimeRange", e);
  }
}

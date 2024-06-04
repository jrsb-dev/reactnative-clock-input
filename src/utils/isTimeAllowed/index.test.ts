import isTimeAllowed from "./index"; // Vervang dit met het pad naar je functie
import parseDisabledTimeRange from "../parseDisabledTimeRange"; // Vervang dit met het pad naar je parseDisabledTimeRange functie

describe("isTimeAllowed", () => {
  test("returns true if parsedDisableTimeRange is null or undefined", () => {
    expect(isTimeAllowed(10, 30, null)).toBe(true);
    expect(isTimeAllowed(10, 30, undefined)).toBe(true);
  });

  test("returns true if time is within allowed range on the same day", () => {
    const parsedDisableTimeRange = parseDisabledTimeRange({
      from: "09:00",
      to: "17:00",
    });
    expect(isTimeAllowed(10, 30, parsedDisableTimeRange)).toBe(true);
    expect(isTimeAllowed(9, 0, parsedDisableTimeRange)).toBe(true);
    expect(isTimeAllowed(17, 0, parsedDisableTimeRange)).toBe(true);
  });

  test("returns false if time is outside allowed range on the same day", () => {
    const parsedDisableTimeRange = parseDisabledTimeRange({
      from: "09:00",
      to: "17:00",
    });
    expect(isTimeAllowed(8, 59, parsedDisableTimeRange)).toBe(false);
    expect(isTimeAllowed(17, 1, parsedDisableTimeRange)).toBe(false);
  });

  test("returns true if time is within allowed range over midnight", () => {
    const parsedDisableTimeRange = parseDisabledTimeRange({
      from: "22:00",
      to: "06:00",
    });
    expect(isTimeAllowed(23, 30, parsedDisableTimeRange)).toBe(true);
    expect(isTimeAllowed(5, 30, parsedDisableTimeRange)).toBe(true);
    expect(isTimeAllowed(22, 0, parsedDisableTimeRange)).toBe(true);
    expect(isTimeAllowed(6, 0, parsedDisableTimeRange)).toBe(true);
  });

  test("returns false if time is outside allowed range over midnight", () => {
    const parsedDisableTimeRange = parseDisabledTimeRange({
      from: "22:00",
      to: "06:00",
    });
    expect(isTimeAllowed(21, 59, parsedDisableTimeRange)).toBe(false);
    expect(isTimeAllowed(6, 1, parsedDisableTimeRange)).toBe(false);
  });
});

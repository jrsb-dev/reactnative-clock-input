import parseDisabledTimeRange from "./index"; // Replace this with the path to your function

describe("parseDisabledTimeRange", () => {
  test("parses a valid disabled time range correctly", () => {
    const disabledTimeRange = { from: "09:30", to: "17:45" };
    const expected = {
      fromHours: 9,
      fromMinutes: 30,
      toHours: 17,
      toMinutes: 45,
    };
    expect(parseDisabledTimeRange(disabledTimeRange)).toEqual(expected);
  });

  test("returns undefined for null or undefined input", () => {
    expect(parseDisabledTimeRange(null)).toBeUndefined();
    expect(parseDisabledTimeRange(undefined)).toBeUndefined();
  });

  test("returns undefined for unparsable time range", () => {
    console.warn = jest.fn(); // Mock console.warn

    const disabledTimeRange = { from: "invalid", to: "invalid" };
    expect(parseDisabledTimeRange(disabledTimeRange)).toBeUndefined();
    expect(console.warn).toHaveBeenCalledWith(
      "You are trying to use an unparsable DisabledTimeRange",
      expect.any(Error),
    );
  });

  test("parses edge cases correctly", () => {
    const disabledTimeRange = { from: "00:00", to: "23:59" };
    const expected = {
      fromHours: 0,
      fromMinutes: 0,
      toHours: 23,
      toMinutes: 59,
    };
    expect(parseDisabledTimeRange(disabledTimeRange)).toEqual(expected);
  });
});

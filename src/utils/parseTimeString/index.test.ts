import parseTimeString from "./index"; // Replace this with the path to your function

describe("parseTimeString", () => {
  test("parses a valid time string correctly", () => {
    const time = "09:30";
    const expected = { hours: 9, minutes: 30 };
    expect(parseTimeString(time)).toEqual(expected);
  });

  test("returns default for null or undefined input", () => {
    expect(parseTimeString(null)).toEqual({ hours: 0, minutes: 0 });
    expect(parseTimeString(undefined)).toEqual({ hours: 0, minutes: 0 });
  });

  test("returns default for unparsable time string", () => {
    console.warn = jest.fn(); // Mock console.warn

    const time = "invalid";
    expect(parseTimeString(time)).toEqual({ hours: 0, minutes: 0 });
    expect(console.warn).toHaveBeenCalledWith(
      "Cannot parse current time as valid time",
      expect.any(Error),
    );
  });

  test("returns default for time string containing NaN values", () => {
    console.warn = jest.fn(); // Mock console.warn

    const time = "09:xx";
    expect(parseTimeString(time)).toEqual({ hours: 0, minutes: 0 });
    expect(console.warn).toHaveBeenCalledWith(
      "Cannot parse current time as valid time",
      expect.any(Error),
    );
  });

  test("returns default for time string with incorrect format", () => {
    console.warn = jest.fn(); // Mock console.warn

    const time = "0930";
    expect(parseTimeString(time)).toEqual({ hours: 0, minutes: 0 });
    expect(console.warn).toHaveBeenCalledWith(
      "Cannot parse current time as valid time",
      expect.any(Error),
    );
  });

  test("parses edge cases correctly", () => {
    const time = "00:00";
    const expected = { hours: 0, minutes: 0 };
    expect(parseTimeString(time)).toEqual(expected);

    const time2 = "23:59";
    const expected2 = { hours: 23, minutes: 59 };
    expect(parseTimeString(time2)).toEqual(expected2);
  });
});

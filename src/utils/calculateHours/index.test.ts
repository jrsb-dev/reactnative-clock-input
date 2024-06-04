import calculateHours from "./index"; //

test("Calculate hours on degree and inner ring", () => {
  expect(calculateHours(30, 30, 100, 90)).toBe(3); // 90 graden komt overeen met 3 uur in de binnenste ring
  expect(calculateHours(0, 0, 100, 360)).toBe(12); // 360 graden komt overeen met 12 uur in de binnenste ring
});

test("Calculate hours on degree and outer ring", () => {
  expect(calculateHours(80, 80, 100, 90)).toBe(15); // 90 graden komt overeen met 3 uur in de buitenste ring, +12 is 15 uur (3 PM)
  expect(calculateHours(80, 0, 100, 360)).toBe(0); // 360 graden komt overeen met 0 uur in de buitenste ring
});

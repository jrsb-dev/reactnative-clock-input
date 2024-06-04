import calculateMinutes from "./index"; // Vervang dit met het pad naar je functie

test("Calculate minutes based on degree and coarseMinutes = 5", () => {
  expect(calculateMinutes(30)).toBe(30); // 30 graden komt overeen met 30 minuten
  expect(calculateMinutes(150)).toBe(30); // 150 graden komt overeen met 150/6 = 25, afgerond naar 30 minuten
  expect(calculateMinutes(350)).toBe(0); // 350 graden komt overeen met 350/6 = 58, afgerond naar 60 en gemoduleerd naar 0 minuten
});

test("Calculate minutes based on degree and coarseMinutes = 15", () => {
  expect(calculateMinutes(30, 15)).toBe(30); // 30 graden komt overeen met 30 minuten
  expect(calculateMinutes(150, 15)).toBe(30); // 150 graden komt overeen met 150/6 = 25, afgerond naar 30 minuten
  expect(calculateMinutes(350, 15)).toBe(0); // 350 graden komt overeen met 350/6 = 58, afgerond naar 60 en gemoduleerd naar 0 minuten
});

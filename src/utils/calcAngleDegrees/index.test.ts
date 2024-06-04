import { calcAngleDegrees } from "../calcAngleDegrees";

describe("calcAngleDegrees", () => {
  test("should calculate the angle correctly for positive x and y", () => {
    const x = 10;
    const y = 10;
    const result = calcAngleDegrees(x, y);
    expect(result).toBe(45);
  });

  test("should calculate the angle correctly for negative x and y", () => {
    const x = -10;
    const y = -10;
    const result = calcAngleDegrees(x, y);
    expect(result).toBe(-135);
  });
});

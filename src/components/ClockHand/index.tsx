import { View } from "react-native";

/**
 * Clock hand
 */
export default function ClockHand({
  handWidth,
  clockHeight,
  angle,
}: {
  handWidth: number;
  clockHeight: number;
  angle: number;
}) {
  return (
    <View
      style={[
        {
          pointerEvents: "none",
          position: "absolute",
          width: handWidth,
          height: clockHeight / 2,
          backgroundColor: "#d3e8f1",
          transformOrigin: "100% 50%",
        },
        {
          transform: [
            { rotate: `${angle}deg` },
            { translateX: handWidth / 2 },
            { translateY: -clockHeight / 4 },
          ],
        },
      ]}
    />
  );
}

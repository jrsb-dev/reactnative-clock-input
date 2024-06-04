import { View } from "react-native";

/**
 * Clock center point
 */
export default function ClockCenterPoint({
  clockWidth,
  clockHeight,
}: {
  clockWidth: number;
  clockHeight: number;
}) {
  return (
    <View
      // This is the center of the clock
      style={{
        backgroundColor: "#a4c9dc",
        width: 4,
        height: 4,
        position: "absolute",
        top: clockHeight / 2 - 1,
        left: clockWidth / 2 - 1,
        borderRadius: 2,
        zIndex: 9999,
      }}
    />
  );
}

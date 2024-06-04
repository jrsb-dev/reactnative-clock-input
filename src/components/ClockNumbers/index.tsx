import { StyleSheet, Text, View } from "react-native";

/**
 * Clock numbers
 */
export default function ClockNumbers({
  isSelectingHour,
  elementDimensionsWidth,
  selectedHour,
  selectedMinute,
  focusItemSize = 50,
  radiusPositionPercentage = 1,
  items,
  fontSize,
}: {
  isSelectingHour: boolean;
  elementDimensionsWidth: number;
  selectedHour: number;
  selectedMinute: number;
  focusItemSize?: number;
  radiusPositionPercentage?: number;
  items: { label: string | number; value: number }[];
  fontSize?: number;
}) {
  const radius = elementDimensionsWidth / 2;
  const selectedItem = isSelectingHour ? selectedHour : selectedMinute;

  return (
    <View
      style={{
        position: "absolute",
        pointerEvents: "none",
      }}
    >
      {items.map((i) => {
        const degree = (i.value / 12) * 360;
        const { x, y } = getClockPosition(
          degree,
          radius * radiusPositionPercentage,
        );

        return (
          <View
            key={i.value}
            style={[
              selectedItem === i.value ? { backgroundColor: "#e6f7ff" } : {},

              {
                borderRadius: focusItemSize / 2,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: focusItemSize,
                height: focusItemSize,
                transformOrigin: "center center",
                transform: [
                  { translateX: x - focusItemSize / 2 },
                  { translateY: y - focusItemSize / 2 },
                ],
              },
            ]}
          >
            <Text style={[styles.clockNumber, { fontSize }]}>{i.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

function getClockPosition(degree: number, radius: number) {
  const radians = (degree - 90) * (Math.PI / 180); // -90 om de 0 graden naar de bovenkant van de cirkel te verplaatsen
  const x = 0 + radius * Math.cos(radians);
  const y = 0 + radius * Math.sin(radians);
  return { x, y };
}

const styles = StyleSheet.create({
  clockNumber: {
    position: "absolute",
    fontSize: 22,
    color: "#999999",
  },
});

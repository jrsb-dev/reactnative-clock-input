import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function DigitalDisplay({
  selectedHour,
  selectedMinute,
  onPressHours,
  onPressMinutes,
  isSelectingHour,
}: {
  selectedHour: number;
  selectedMinute: number;
  onPressHours?: () => void;
  onPressMinutes?: () => void;
  isSelectingHour: boolean;
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressHours}>
        <Text style={[styles.text, isSelectingHour ? styles.active : null]}>
          {String(selectedHour).padStart(2, "0")}
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>:</Text>
      <TouchableOpacity onPress={onPressMinutes}>
        <Text style={[styles.text, isSelectingHour ? null : styles.active]}>
          {String(selectedMinute).padStart(2, "0")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  text: {
    fontSize: 34,
    color: "#8C8C8C",
    paddingHorizontal: 2,
  },
  active: {
    color: "#8EDDFD",
  },
});

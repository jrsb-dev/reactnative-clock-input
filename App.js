import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Clock from "./src/Clock";

export default function App() {
  return (
    <View style={styles.container}>
      <View
        aspectRatio={1}
        style={{
          backgroundColor: "blue",
          display: "flex",
          width: "100%",
          padding: 20,
        }}
      >
        <Clock />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },
});

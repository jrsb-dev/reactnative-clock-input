import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Clock from "./src/index";
import { useState } from "react";

const blaat = new Date();

export default function App() {
  const [time, setTime] = useState(blaat);
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 50,
          display: "flex",
          width: "100%",
        }}
      >
        <Clock
          time={[time.getHours(), time.getMinutes()].join(":")}
          onChange={({ hours, minutes }) => {
            setTime((v) => {
              const newState = new Date(v);
              newState.setHours(hours);
              newState.setMinutes(minutes);

              return newState;
            });
          }}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

import {
  Text,
  View,
  PanResponder,
  GestureResponderEvent,
  Button,
  StyleSheet,
} from "react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface Dimensions {
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

function calcAngleDegrees(x: number, y: number) {
  return (Math.atan2(y, x) * 180) / Math.PI;
}

export default function Clock({ handWidth = 2 }: { handWidth?: number }) {
  const elementRef = useRef<View | null>(null);
  const [angle, setAngle] = useState<number>(0);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [isSelectingHour, setIsSelectingHour] = useState(true);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });

  const [elementDimensions, setElementDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
  });
  const clockRadius = elementDimensions.width / 2;

  /**
   * main function to track x,y of touches
   */
  const onPanResponderMove = useCallback(
    (locationX, locationY) => {
      const touchX = locationX;
      const touchY = locationY;

      setTouchPosition({ x: touchX, y: touchY });

      const centerX = elementDimensions.width / 2;
      const centerY = elementDimensions.height / 2;

      const dx = touchX - centerX;
      const dy = touchY - centerY;

      // to be very honest, adding 90 is a very magic number.
      let angle = calcAngleDegrees(dx, dy) + 90;

      if (angle < 0) {
        angle += 360;
      }

      if (isSelectingHour) {
        setSelectedHour(Math.round(angle / 30) % 12);
      } else {
        setSelectedMinute(Math.round(angle / 6) % 60);
      }

      setAngle(angle);
    },
    [setAngle, setTouchPosition, elementDimensions, isSelectingHour],
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt: GestureResponderEvent) =>
          onPanResponderMove(
            evt.nativeEvent.locationX,
            evt.nativeEvent.locationY,
          ),
      }),
    [elementDimensions, onPanResponderMove],
  );

  const measureElement = useCallback(() => {
    elementRef.current?.measure((x_, y_, width, height, pageX, pageY) => {
      setElementDimensions({
        width,
        height,
        pageX,
        pageY,
      });
    });
  }, [elementRef.current]);

  useEffect(() => {
    measureElement();
  }, [measureElement]);

  const handStyle = {
    transform: [
      { rotate: `${angle}deg` },
      { translateX: -handWidth / 2 },
      { translateY: -clockRadius + 10 },
    ],
  };

  return (
    <View
      style={{
        padding: 0,
        position: "relative",
      }}
    >
      <View
        // debug view, show center of the clock
        style={{
          backgroundColor: "red",
          width: 2,
          height: 2,
          position: "absolute",
          top: elementDimensions.height / 2,
          left: elementDimensions.width / 2,
          zIndex: 9999,
        }}
      />

      <View
        ref={elementRef}
        aspectRatio={1}
        onLayout={() => measureElement()}
        {...panResponder.panHandlers}
        style={{
          backgroundColor: "green",
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          // debug, show x,y of touch
          style={{
            backgroundColor: "yellow",
            width: 2,
            height: 2,
            position: "absolute",
            top: touchPosition.y,
            left: touchPosition.x,
            zIndex: 9999,
          }}
        />
        <View
          style={[
            {
              position: "absolute",
              width: handWidth,
              height: 300,
              backgroundColor: "black",
            },
            handStyle,
          ]}
        />
      </View>

      <Button title="measure" onPress={() => measureElement()} />

      <View>
        <Text>
          {selectedHour}:{selectedMinute}
        </Text>
      </View>
      <View>
        <Text>{JSON.stringify(elementDimensions, null, 2)}</Text>
      </View>

      <View>
        <Text>angle: {JSON.stringify(angle, null, 2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  clockFace: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  clockNumber: {
    position: "absolute",
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  hand: {
    position: "absolute",
    width: 4,
    height: "40%",
    backgroundColor: "red",
    borderRadius: 4,
  },
  timeDisplayContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  timeDisplay: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  timeDisplaySeparator: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

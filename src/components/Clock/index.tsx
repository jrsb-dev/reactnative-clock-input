import { View, StyleSheet } from "react-native";
import ClockCenterPoint from "../../components/ClockCenterPoint";
import ClockHand from "../../components/ClockHand";
import ClockNumbers from "../../components/ClockNumbers";
import useClock from "../../hooks/useClock";
import DigitalDisplay from "../../components/DigitalDisplay";
import { DisabledTimeRange } from "../../utils/parseDisabledTimeRange";

/**
 * Clock
 * component based on react-timekeeper, which is based on native Android Timepicker handling
 * e.g. in Google Keep
 */
export default function Clock({
  handWidth = 2,
  onChange,
  time,
  disabledTimeRange,
}: {
  handWidth?: number;
  time: string;
  onChange: (v: { time: string; hours: number; minutes: number }) => void;
  disabledTimeRange?: DisabledTimeRange;
}) {
  const {
    isSelectingHour,
    selectedHour,
    elementRef,
    panResponder,
    elementDimensions,
    selectedMinute,
    measureElement,
    setIsSelectingHour,
  } = useClock({ time, onChange, disabledTimeRange });

  const targetAngle = isSelectingHour
    ? selectedHour * 30
    : Math.round(selectedMinute / 5) * 5 * 6;

  return (
    <>
      <DigitalDisplay
        selectedHour={selectedHour}
        selectedMinute={selectedMinute}
        isSelectingHour={isSelectingHour}
        onPressHours={() => setIsSelectingHour(true)}
        onPressMinutes={() => setIsSelectingHour(false)}
      />

      <View style={styles.outerContainer}>
        <View
          // this is the clock container
          ref={elementRef}
          onLayout={() => measureElement()}
          {...panResponder.panHandlers}
          style={[
            styles.container,
            {
              borderRadius: elementDimensions.width / 2,
            },
          ]}
        >
          <ClockCenterPoint
            clockHeight={elementDimensions.height}
            clockWidth={elementDimensions.width}
          />

          <ClockHand
            handWidth={handWidth}
            clockHeight={elementDimensions.height - 100}
            angle={targetAngle}
          />

          {isSelectingHour ? (
            <>
              <ClockNumbers
                isSelectingHour={isSelectingHour}
                elementDimensionsWidth={elementDimensions.width}
                selectedHour={selectedHour}
                selectedMinute={selectedMinute}
                radiusPositionPercentage={0.62}
                items={items.hours24Inner}
                fontSize={20}
              />

              <ClockNumbers
                isSelectingHour={isSelectingHour}
                elementDimensionsWidth={elementDimensions.width}
                selectedHour={selectedHour}
                selectedMinute={selectedMinute}
                items={items.hours24Outer}
                radiusPositionPercentage={0.85}
                fontSize={18}
              />
            </>
          ) : (
            <ClockNumbers
              isSelectingHour={isSelectingHour}
              elementDimensionsWidth={elementDimensions.width}
              selectedHour={selectedHour}
              selectedMinute={selectedMinute / 5}
              radiusPositionPercentage={0.85}
              items={items.minutesPer5Minutes}
              fontSize={20}
            />
          )}
        </View>
      </View>
    </>
  );
}

const items = {
  // 24 hour clock outer ring
  hours24Outer: Array.from({ length: 12 }, (_, i) => {
    const label = i === 0 ? "00" : i + 12;
    return { value: i === 0 ? 0 : i + 12, label: label };
  }),
  // 24 hour clock inner ring
  hours24Inner: Array.from({ length: 12 }, (_, i) => {
    const value = i === 0 ? 12 : i;
    return { value, label: value };
  }),
  // minutes clock ring
  minutesPer5Minutes: Array.from({ length: 60 / 5 }, (_, i) => ({
    value: i,
    label: i * 5,
  })),
};

const styles = StyleSheet.create({
  outerContainer: {
    padding: 30,
    backgroundColor: "#f4f4f4",
  },
  container: {
    aspectRatio: 1,
    backgroundColor: "#fff",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GestureResponderEvent, PanResponder, View } from "react-native";

import parseTimeString from "../../utils/parseTimeString";
import { DisabledTimeRange } from "../../utils/parseDisabledTimeRange";
import panResponderMove from "../../utils/panResponderMove";

interface Props {
  time: string;
  onChange: ({
    hours,
    minutes,
  }: {
    time: string;
    hours: number;
    minutes: number;
  }) => void;
  disabledTimeRange: DisabledTimeRange;
}

interface Dimensions {
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

export default function useClock({ time, onChange, disabledTimeRange }: Props) {
  const elementRef = useRef<View | null>(null);

  const { hours, minutes } = parseTimeString(time);
  const [isSelectingHour, setIsSelectingHour] = useState(true);

  const [elementDimensions, setElementDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
  });

  /**
   * main function to track x,y of touches
   */
  const onPanResponderMove = useCallback(
    (locationX: number, locationY: number) => {
      const payload = panResponderMove({
        locationX,
        locationY,
        elemWidth: elementDimensions.width,
        elemHeight: elementDimensions.height,
        isSelectingHour,
        disabledTimeRange,
        time,
      });
      if (payload) onChange(payload);
    },
    [elementDimensions, isSelectingHour, onChange, disabledTimeRange, time],
  );

  /**
   * pan responder
   * I'm passing locationX and -Y directly as primitives, for performance
   * e.g. persisting events not needed
   */
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderStart: (evt: GestureResponderEvent) =>
          onPanResponderMove(
            evt.nativeEvent.locationX,
            evt.nativeEvent.locationY,
          ),
        onPanResponderMove: (evt: GestureResponderEvent) =>
          onPanResponderMove(
            evt.nativeEvent.locationX,
            evt.nativeEvent.locationY,
          ),
        onPanResponderEnd: (evt: GestureResponderEvent) => {
          onPanResponderMove(
            evt.nativeEvent.locationX,
            evt.nativeEvent.locationY,
          );
          if (isSelectingHour) setIsSelectingHour(false);
        },
      }),
    [
      elementDimensions,
      onPanResponderMove,
      setIsSelectingHour,
      isSelectingHour,
    ],
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

  return {
    elementRef,
    selectedHour: hours,
    selectedMinute: minutes,
    isSelectingHour,
    elementDimensions,
    panResponder,
    measureElement,
    setIsSelectingHour,
  };
}

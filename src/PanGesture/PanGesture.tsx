import { View, StyleSheet } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay } from "react-native-reanimated";
import { clamp } from "react-native-redash";

import { Card, Cards, CARD_HEIGHT, CARD_WIDTH } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface GestureProps {
  width: number;
  height: number;
}

type AnimatedGHContext = {
  offsetX: number;
  offsetY: number;
};


export const PanGesture = ({ width, height }: GestureProps) => {

  const boundX = width - CARD_WIDTH;
  const boundY = height - CARD_HEIGHT;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<
  PanGestureHandlerGestureEvent,
  AnimatedGHContext
>({
    onStart:(_, ctx) => {
      ctx.offsetX = translateX.value
      ctx.offsetY = translateY.value
    },
    onActive: (event, ctx) => {
      translateX.value = clamp(ctx.offsetX + event.translationX, 0, boundX)
      translateY.value = clamp(ctx.offsetY + event.translationY, 0, boundY)
    },
    onEnd: (event) => {
      translateX.value = withDecay({velocity: event.velocityX, clamp: [0, boundX]})
      translateY.value = withDecay({velocity: event.velocityY, clamp: [0, boundY]})
    }
  })

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value}
      ]
    }
  })

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View {...{style}}>
          <Card card={Cards.Card1} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
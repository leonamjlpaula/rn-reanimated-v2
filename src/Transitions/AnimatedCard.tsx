import { StyleSheet, Dimensions } from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

import type { Cards } from "../components";
import { Card, StyleGuide } from "../components";

const { width } = Dimensions.get("window");
const origin = -(width / 2 - StyleGuide.spacing * 2);
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: StyleGuide.spacing * 4,
  },
});

interface AnimatedCardProps {
  toggled: boolean;
  index: number;
  card: Cards;
  transition: any;
}

export const AnimatedCard = ({ card, index, transition }: AnimatedCardProps) => {  
  
  const style = useAnimatedStyle(() => {
    const rotate = interpolate(transition.value, [0,1], [0, (index-1)*Math.PI/6])
    return {transform: [
      { translateX: origin },
      { rotate: `${rotate}rad` },
      { translateX: -origin },
    ],}
  });
  return (
    <Animated.View key={card} style={[styles.overlay, style]}>
      <Card {...{ card }} />
    </Animated.View>
  );
};

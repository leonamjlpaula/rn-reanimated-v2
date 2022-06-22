import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  // withSpring,
  withTiming,
} from "react-native-reanimated";

import { Button, StyleGuide, cards } from "../components";

import { AnimatedCard } from "./AnimatedCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end",
  },
});

export const Transitions = () => {
  const [toggled, setToggle] = useState(false);
  const isToggled = useSharedValue(false);

  useEffect(() => {
    isToggled.value = toggled;
  }, [toggled, isToggled]);

  const transition = useDerivedValue(() => {
    return withTiming(isToggled.value ? 1 : 0, {duration: 2000, easing: Easing.cubic});
  });

  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => (
        <AnimatedCard key={card} {...{ index, card, transition, toggled }} />
      ))}
      <Button
        label={toggled ? "Reset" : "Start"}
        primary
        onPress={() => setToggle((prev) => !prev)}
      />
    </View>
  );
};

import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type TriggerButtonProps = {
  onPress?: () => void;
};

export default function TriggerButton({onPress}: TriggerButtonProps) {
  const buttonSize = useSharedValue(45);

  const animatedStyles = useAnimatedStyle(() => ({
    width: withTiming(buttonSize.value),
    height: withTiming(buttonSize.value),
  }));

  return (
    <View style={styles.triggerButtonOuter}>
      <AnimatedPressable
        onPressIn={() => (buttonSize.value = 35)}
        onPressOut={() => (buttonSize.value = 45)}
        onPress={onPress}
        style={[styles.triggerButtonInner, animatedStyles]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  triggerButtonOuter: {
    borderRadius: 30,
    width: 60,
    height: 60,
    borderWidth: 4,
    borderColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  triggerButtonInner: {
    borderRadius: 50,
    backgroundColor: 'red',
  },
});

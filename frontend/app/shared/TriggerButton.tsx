import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type TriggerButtonProps = {
  onPress?: () => void;
};

export default function TriggerButton({onPress}: TriggerButtonProps) {
  const buttonSize = useSharedValue(45);

  return (
    <View style={styles.triggerButtonOuter}>
      <AnimatedPressable
        onPressIn={() => (buttonSize.value = withTiming(35))}
        onPressOut={() => (buttonSize.value = withTiming(45))}
        onPress={onPress}
        style={[
          styles.triggerButtonInner,
          {
            width: buttonSize,
            height: buttonSize,
          },
        ]}
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

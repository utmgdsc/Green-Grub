import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {WHITE, PRIMARY_GREEN} from '../colors';
import {BUTTON_BORDERRADIUS} from '../sizing';

type SecondaryButtonProps = {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function SecondaryButton({
  title,
  onPress,
}: SecondaryButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export function SecondaryButtonDynamic({
  title,
  onPress,
  style,
}: SecondaryButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonDynamic, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: PRIMARY_GREEN,
    padding: 10,
    borderRadius: BUTTON_BORDERRADIUS,
    alignSelf: 'center',
    width: '65%',
  },
  buttonDynamic: {
    backgroundColor: PRIMARY_GREEN,
    padding: 10,
    borderRadius: BUTTON_BORDERRADIUS,
    alignSelf: 'center',
  },
  buttonText: {
    color: WHITE,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

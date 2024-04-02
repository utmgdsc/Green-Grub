import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {BLACK, WHITE, PRIMARY_GREEN} from '../colors';
import {TEXT_MEDIUM, BUTTON_BORDERRADIUS} from '../sizing';

type SecondaryButtonProps = {
  title: string;
  onPress?: () => void;
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

const styles = StyleSheet.create({
  button: {
    backgroundColor: PRIMARY_GREEN,
    padding: 10,
    borderRadius: BUTTON_BORDERRADIUS,
    alignSelf: 'center',
    width: '65%',
  },
  buttonText: {
    color: WHITE,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

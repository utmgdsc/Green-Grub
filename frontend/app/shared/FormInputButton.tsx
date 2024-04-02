import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {WHITE, DARK_GRAY} from '../colors';
import {TEXT_MEDIUM} from '../sizing';

type FormInputButtonProps = {
  title: string;
  onPress?: () => void;
};

export default function FormInputButton({
  title,
  onPress,
}: FormInputButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: DARK_GRAY,
    padding: 5,
    borderRadius: 7,
    alignSelf: 'center',
    width: '50%',
  },
  buttonText: {
    color: WHITE,
    textAlign: 'center',
    fontSize: TEXT_MEDIUM,
    fontWeight: 'bold',
  },
});

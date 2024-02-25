import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {BLACK, WHITE} from '../colors';
import {TEXT_MEDIUM} from '../sizing';

type MainButtonProps = {
  title: string;
  onPress?: () => void;
};

export default function MainButton({title, onPress}: MainButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: WHITE,
    padding: 15,
    borderRadius: 7,
  },
  buttonText: {
    color: BLACK,
    textAlign: 'center',
    fontSize: TEXT_MEDIUM,
    fontWeight: 'bold',
  },
});

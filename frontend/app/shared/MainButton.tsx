import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {GRAY, PRIMARY_GREEN} from '../colors';
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
    backgroundColor: PRIMARY_GREEN,
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: GRAY,
    textAlign: 'center',
    fontSize: TEXT_MEDIUM,
    fontWeight: 'bold',
  },
});

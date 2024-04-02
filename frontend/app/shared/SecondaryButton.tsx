import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {BLACK, WHITE, PRIMARY_GREEN} from '../colors';
import {TEXT_MEDIUM} from '../sizing';

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
    padding: 15,
    borderRadius: 7,
    alignSelf: 'center',
    width: '70%',
  },
  buttonText: {
    color: WHITE,
    textAlign: 'center',
    fontSize: TEXT_MEDIUM,
    fontWeight: 'bold',
  },
});

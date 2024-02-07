import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

type TextInputFieldProps = {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
};

export default function TextInputField({
  title,
  value,
  onChangeText,
}: TextInputFieldProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder={title}
      onChangeText={onChangeText}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

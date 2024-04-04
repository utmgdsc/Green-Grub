import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TEXT_SMALL} from '../sizing';

type TextFieldProps = {
  title: string;
  value: string;
};

export default function TextField({title, value}: TextFieldProps) {
  return (
    <View style={styles.inputView}>
      <Text style={styles.inputTitle}>{title}</Text>
      <Text style={styles.input}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  inputTitle: {
    fontSize: TEXT_SMALL,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  inputView: {
    width: '100%',
    paddingHorizontal: 40,
  },
  input: {
    width: '100%',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    color: 'white',
    marginBottom: 10,
  },
});

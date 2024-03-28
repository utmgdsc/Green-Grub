import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {TEXT_SMALL} from '../sizing';

type TextInputFieldProps = {
  title: string;
  value: string;
  isSecureText: boolean;
  onChangeText: (text: string) => void;
};

export function TextInputGroup({children}: PropsWithChildren) {
  return <View style={styles.inputGroup}>{children}</View>;
}

export default function TextInputField({
  title,
  value,
  onChangeText,
  isSecureText,
}: TextInputFieldProps) {
  return (
    <View style={styles.inputView}>
      <Text style={styles.inputTitle}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={title}
        placeholderTextColor={'gray'}
        onChangeText={onChangeText}
        secureTextEntry={isSecureText}
        value={value}
      />
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
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    backgroundColor: '#FFF',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    color: 'black',
  },
});

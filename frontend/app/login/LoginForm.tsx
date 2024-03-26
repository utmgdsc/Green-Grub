import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import TextInputField from '../shared/TextInputField';
import MainButton from '../shared/MainButton';
import ButtonGroup from '../shared/ButtonGroup';
import {TEXT_SMALL} from '../sizing';

type LoginFormProps = {
  username: string;
  setUsername: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  handleLogin: () => void;
  errorMessage: string;
};

export default function LoginForm({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  errorMessage,
}: LoginFormProps) {
  return (
    <View style={styles.container}>
      <TextInputField
        title="Username"
        onChangeText={setUsername}
        value={username}
        isSecureText={false}
      />
      <TextInputField
        title="Password"
        onChangeText={setPassword}
        value={password}
        isSecureText={true}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    backgroundColor: '#eb3443',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 5,
    fontSize: TEXT_SMALL,
  },
});

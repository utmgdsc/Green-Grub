import React from 'react';

import {StyleSheet, View} from 'react-native';
import TextInputField from '../shared/TextInputField';
import MainButton from '../shared/MainButton';
import ButtonGroup from '../shared/ButtonGroup';

type LoginFormProps = {
  username: string;
  setUsername: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  handleLogin: () => void;
};

export default function LoginForm({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
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
      <ButtonGroup>
        <MainButton title="Login" onPress={handleLogin} />
      </ButtonGroup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

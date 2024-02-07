import React from 'react';

import {StyleSheet, View} from 'react-native';
import {TEXT_HUGE} from '../sizing';
import TextInputField from '../shared/TextInputField';

export default function LoginForm() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <TextInputField
        title="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInputField
        title="Password"
        onChangeText={setPassword}
        value={password}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: TEXT_HUGE,
    marginBottom: 20,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
  },
});

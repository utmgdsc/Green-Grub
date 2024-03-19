import React, {useState} from 'react';

import {Alert, StyleSheet, View} from 'react-native';
import TextInputField, {TextInputGroup} from '../shared/TextInputField';
import ButtonGroup from '../shared/ButtonGroup';
import MainButton from '../shared/MainButton';
import {useDispatch} from 'react-redux';
import {saveAuthToken} from '../authSlice';
import {setUsername} from '../userSlice';
import {AppDispatch} from '../store';

export default function RegisterForm({}) {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setLocalUsername] = useState('');
  const [password, setLocalPassword] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [city, setCity] = useState('');

  const handleRegister = async () => {
    try {
      await fetch('http://localhost:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const {refresh, access} = await response.json();

      if (access && refresh) {
        await dispatch(
          saveAuthToken({accessToken: access, refreshToken: refresh}),
        );
        dispatch(setUsername(username));
      } else {
        Alert.alert(
          'Error',
          'Registration succeeded but no token was received.',
        );
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert(
        'Registration Error',
        'An error occurred during registration.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInputGroup>
        <TextInputField
          title="Username"
          onChangeText={setLocalUsername}
          value={username}
          isSecureText={false}
        />
        <TextInputField
          title="Email Address"
          onChangeText={setEmailAddress}
          value={emailAddress}
          isSecureText={false}
        />
        <TextInputField
          title="City"
          onChangeText={setCity}
          value={city}
          isSecureText={false}
        />
        <TextInputField
          title="Password"
          onChangeText={setLocalPassword}
          value={password}
          isSecureText={true}
        />
      </TextInputGroup>
      <ButtonGroup>
        <MainButton title="Register" onPress={handleRegister} />
      </ButtonGroup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
});

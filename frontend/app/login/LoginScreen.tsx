import React, {useState} from 'react';
import {Text, StyleSheet, View, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUsername} from '../userSlice';
import {saveAuthToken} from '../authSlice';
import {StackScreenProps} from '@react-navigation/stack';
import {TEXT_HUGE} from '../sizing';
import {PRIMARY_BLUE, WHITE} from '../colors';
import MainButton from '../shared/MainButton';
import ButtonGroup from '../shared/ButtonGroup';
import LoginForm from './LoginForm';
import {StartStackParamList} from '../StartStack';
import {AppDispatch} from '../store';

type StartScreenProps = StackScreenProps<StartStackParamList, 'Login'>;

export default function LoginScreen({}: StartScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setLocalUsername] = useState('');
  const [password, setLocalPassword] = useState('');

  const handleLogin = async () => {
    try {
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

      const {access, refresh} = await response.json();

      if (access) {
        await dispatch(
          saveAuthToken({accessToken: access, refreshToken: refresh}),
        );
        dispatch(setUsername(username));
      } else {
        Alert.alert('Login Failed', 'No token received.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Error',
        'Failed to log in. Please check your credentials and try again.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <LoginForm
        username={username}
        setUsername={setLocalUsername}
        password={password}
        setPassword={setLocalPassword}
      />
      <ButtonGroup>
        <MainButton title="Login" onPress={handleLogin} />
      </ButtonGroup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: TEXT_HUGE,
    fontFamily: 'Pacifico-Regular',
    marginTop: 100,
    color: WHITE,
  },
});

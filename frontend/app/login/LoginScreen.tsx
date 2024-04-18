import React, {useState} from 'react';
import {Text, StyleSheet, View, ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUsername} from '../userSlice';
import {saveAuthToken} from '../authSlice';
import {StackScreenProps} from '@react-navigation/stack';
import {TEXT_HUGE} from '../sizing';
import {PRIMARY_BLUE, WHITE} from '../colors';
import LoginForm from './LoginForm';
import {StartStackParamList} from '../StartStack';
import {AppDispatch} from '../store';
import MainButton from '../shared/MainButton';
import ButtonGroup from '../shared/ButtonGroup';
import {SERVER_URL} from '../api';

type StartScreenProps = StackScreenProps<StartStackParamList, 'Login'>;

export default function LoginScreen({navigation}: StartScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setLocalUsername] = useState('');
  const [password, setLocalPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const controller = new AbortController();

      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const url = `${SERVER_URL}login/`;
      const response = await fetch(url, {
        signal: controller.signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      clearTimeout(timeoutId);

      const {access, refresh} = await response.json();

      if (response.ok && access) {
        await dispatch(
          saveAuthToken({accessToken: access, refreshToken: refresh}),
        );
        dispatch(setUsername(username));
      } else if (response.status === 401) {
        setErrorMessage('Incorrect credentials. Please try again.');
      } else {
        throw new Error('Failed to log in');
      }
    } catch (error) {
      setErrorMessage('Failed to log in. Please check back later.');
      console.error('Failed to log in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color={WHITE} />
      ) : (
        <>
          <LoginForm
            username={username}
            setUsername={setLocalUsername}
            password={password}
            setPassword={setLocalPassword}
            errorMessage={errorMessage}
            handleLogin={handleLogin}
          />
          <ButtonGroup>
            <MainButton title="Login" onPress={handleLogin} />
            <MainButton title="Back" onPress={handleBack} />
          </ButtonGroup>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY_BLUE,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingBottom: 150,
  },
  title: {
    fontSize: TEXT_HUGE,
    fontFamily: 'Pacifico-Regular',
    marginTop: 100,
    color: WHITE,
  },
});

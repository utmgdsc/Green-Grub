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
import RegisterForm from './RegisterForm';
import {AppDispatch} from '../store';
import {StartStackParamList} from '../StartStack';

type StartScreenProps = StackScreenProps<StartStackParamList, 'Register'>;

export default function RegisterScreen({navigation}: StartScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setLocalUsername] = useState('');
  const [password, setLocalPassword] = useState('');

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

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <RegisterForm
        username={username}
        setUsername={setLocalUsername}
        password={password}
        setPassword={setLocalPassword}
      />
      <ButtonGroup>
        <MainButton title="Register" onPress={handleRegister} />
        <MainButton title="Back" onPress={handleBack} />
      </ButtonGroup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_BLUE,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 100,
  },
  title: {
    fontSize: TEXT_HUGE,
    fontFamily: 'Pacifico-Regular',
    marginTop: 100,
    color: WHITE,
  },
});

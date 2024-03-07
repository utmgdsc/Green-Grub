import React, {useState} from 'react';
import {Text, StyleSheet, View, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUsername} from '../userSlice';
import {saveAuthToken} from '../authSlice';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {TEXT_HUGE, TEXT_LARGE} from '../sizing';
import {PRIMARY_BLUE, WHITE} from '../colors';
import MainButton from '../shared/MainButton';
import ButtonGroup from '../shared/ButtonGroup';
import RegisterForm from './RegisterForm';
import axios from 'axios';

type StartScreenProps = StackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({navigation}: StartScreenProps) {
  const dispatch = useDispatch();
  const [username, setLocalUsername] = useState('');
  const [password, setLocalPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8000/api/signup/', {
        username,
        password,
      });

      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password,
      });

      const {access} = response.data;

      if (access) {
        await dispatch(saveAuthToken(access));
        dispatch(setUsername(username));
        navigation.navigate('Main');
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
      <Text style={styles.title}>Register</Text>
      <RegisterForm
        username={username}
        setUsername={setLocalUsername}
        password={password}
        setPassword={setLocalPassword}
      />
      <ButtonGroup>
        <MainButton title="Register" onPress={handleRegister} />
        {/* <MainButton
          title="Go Back"
          onPress={navigation.navigate('Main')} 
        /> */}
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

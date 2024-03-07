import React, {useState} from 'react';
import {Text, StyleSheet, View, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUsername} from '../userSlice';
import {saveAuthToken} from '../authSlice';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {TEXT_HUGE} from '../sizing';
import {PRIMARY_BLUE, WHITE} from '../colors';
import MainButton from '../shared/MainButton';
import ButtonGroup from '../shared/ButtonGroup';
import LoginForm from './LoginForm';
import axios from 'axios';

type StartScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({navigation}: StartScreenProps) {
  const dispatch = useDispatch();
  const [username, setLocalUsername] = useState('');
  const [password, setLocalPassword] = useState('');

  const handleLogin = async () => {
    try {
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

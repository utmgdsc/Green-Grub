import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {TEXT_HUGE, TEXT_LARGE} from '../sizing';
import MainButton from '../shared/MainButton';
import ButtonGroup from '../shared/ButtonGroup';
import LoginForm from './LoginForm';
import {useDispatch} from 'react-redux';
import {setUsername} from '../userSlice';

type StartScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({navigation}: StartScreenProps) {
  const dispatch = useDispatch();
  const [username, setLocalUsername] = React.useState('');
  const [password, setLocalPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Green Grub</Text>
      <Text style={styles.subtitle}>login</Text>
      <LoginForm
        username={username}
        setUsername={setLocalUsername}
        password={password}
        setPassword={setLocalPassword}
      />
      <ButtonGroup>
        <MainButton
          title="Login"
          onPress={() => {
            dispatch(setUsername(username));
            navigation.navigate('Main');
          }}
        />
      </ButtonGroup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: TEXT_HUGE,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: TEXT_LARGE,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
  },
});

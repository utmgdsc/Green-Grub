import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import MainButton from '../shared/MainButton';
import ButtonGroup from '../shared/ButtonGroup';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from './HomeTab';

type HomeScreenProps = StackScreenProps<HomeStackParamList, 'Home'>;

export default function LoginScreen({navigation}: HomeScreenProps) {
  const username = useSelector((state: RootState) => state.user.username);

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Hello, {username}!</Text>
      <ButtonGroup>
        <MainButton
          title="Saved Items"
          onPress={() => navigation.navigate('Saved Items')}
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
  loginText: {
    color: 'gray',
  },
});

import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {TEXT_HUGE} from '../sizing';
import {PRIMARY_BLUE, WHITE} from '../colors';
import RegisterForm from './RegisterForm';
import {StartStackParamList} from '../StartStack';

type StartScreenProps = StackScreenProps<StartStackParamList, 'Register'>;

export default function RegisterScreen({}: StartScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <RegisterForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: PRIMARY_BLUE,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 30,
  },
  title: {
    fontSize: TEXT_HUGE,
    fontFamily: 'Pacifico-Regular',
    color: WHITE,
  },
});

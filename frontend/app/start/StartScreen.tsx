import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {TEXT_HUGE} from '../sizing';
import MainButton from '../shared/MainButton';
import ButtonGroup from '../shared/ButtonGroup';

type StartScreenProps = StackScreenProps<RootStackParamList, 'Start'>;

export default function StartScreen({}: StartScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Green Grub</Text>
      <ButtonGroup>
        <MainButton title="Login" onPress={() => console.log('Login')} />
        <MainButton title="Register" onPress={() => console.log('Register')} />
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
    marginBottom: 20,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
  },
});

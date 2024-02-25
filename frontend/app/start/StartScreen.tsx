import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {TEXT_HUGE, TEXT_MEDIUM} from '../sizing';
import MainButton from '../shared/MainButton';
import ButtonGroup from '../shared/ButtonGroup';
import { PRIMARY_BLUE } from '../colors';

type StartScreenProps = StackScreenProps<RootStackParamList, 'Start'>;

export default function StartScreen({navigation}: StartScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>GreenGrub</Text>
        <Text style={styles.subtitle}>
          Healthy and sustainable food options
        </Text>
      </View>
      <ButtonGroup>
        <MainButton
          title="Login"
          onPress={() => navigation.navigate('Login')}
        />
        <MainButton title="Register" onPress={() => console.log('Register')} />
      </ButtonGroup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: PRIMARY_BLUE,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  title: {
    fontSize: TEXT_HUGE,
    marginBottom: 20,
    fontFamily: 'Pacifico-Regular',
    color: 'white',
  },
  subtitle: {
    fontSize: TEXT_MEDIUM,
    color: 'white',
  },
});

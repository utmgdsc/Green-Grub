import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {TEXT_HUGE, TEXT_MEDIUM} from '../sizing';
import MainButton from '../shared/MainButton';
import ButtonGroup from '../shared/ButtonGroup';
import {PRIMARY_BLUE} from '../colors';
import {StartStackParamList} from '../StartStack';

type StartScreenProps = StackScreenProps<StartStackParamList, 'Start'>;

export default function StartScreen({navigation}: StartScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>GreenGrub</Text>
        <Text style={styles.subtitle}>
          Track healthy and sustainable purchases, gather points and compete
          with friends
        </Text>
      </View>
      <ButtonGroup>
        <MainButton
          title="Login"
          onPress={() => navigation.navigate('Login')}
        />
        <MainButton
          title="Register"
          onPress={() => navigation.navigate('Register')}
        />
      </ButtonGroup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
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
    textAlign: 'center',
    paddingHorizontal: 28,
    color: 'white',
  },
});

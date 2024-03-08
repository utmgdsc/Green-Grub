/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from './start/StartScreen';
import LoginScreen from './login/LoginScreen';
import RegisterScreen from './register/RegisterScreen';

export type StartStackParamList = {
  Start: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<StartStackParamList>();

export default function App(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from './app/start/StartScreen';
import LoginScreen from './app/login/LoginScreen';
import MainTabs from './app/MainTabs';

import {store} from './app/store';
import {Provider} from 'react-redux';
import ScanResultScreen from './app/scan/ScanResultScreen';

export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  Main: undefined;
  'Scan Result': {barcode: string};
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Start"
            component={StartScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Scan Result" component={ScanResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

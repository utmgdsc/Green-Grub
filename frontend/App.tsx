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
import RegisterScreen from './app/register/RegisterScreen';
import ProfileScreen from './app/profile/ProfileScreen';
import MainTabs from './app/MainTabs';

import {store} from './app/store';
import {Provider} from 'react-redux';
import BarcodeScanResultScreen from './app/scan/BarcodeScanResultScreen';
import ReceiptScanResultScreen from './app/scan/ReceiptScanResultScreen';

export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  Main: undefined;
  'Barcode Scan Result': {barcode: string};
  'Receipt Scan Result': {path: string};
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
            name="Register"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Barcode Scan Result"
            component={BarcodeScanResultScreen}
          />
          <Stack.Screen
            name="Receipt Scan Result"
            component={ReceiptScanResultScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

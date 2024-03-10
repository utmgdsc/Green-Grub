/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {AppDispatch, RootState, store} from './app/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import MainTabs from './app/MainTabs';
import StartStack from './app/StartStack';
import {Text} from 'react-native';
import {loadAuthToken} from './app/authSlice';

function Root(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const authStatus = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    dispatch(loadAuthToken());
  });

  return authStatus === 'authenticated' || authStatus === 'stale' ? (
    <MainTabs />
  ) : authStatus === 'loading' ? (
    <Text>Loading</Text>
  ) : (
    <StartStack />
  );
}

export default function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </Provider>
  );
}

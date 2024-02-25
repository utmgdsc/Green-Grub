import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StyleSheet, Text, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainTabs';
import {TEXT_HUGE, TEXT_LARGE, TEXT_MEDIUM} from '../sizing';
import {PRIMARY_BLUE, WHITE} from '../colors';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import ProfileForm from './ProfileForm';
import ButtonGroup from '../shared/ButtonGroup';
import MainButton from '../shared/MainButton';

type StartScreenProps = BottomTabScreenProps<MainTabsParamList, 'Home'>;

export default function ProfileScreen({navigation}: StartScreenProps) {
  const username = useSelector(
    (state: RootState) => state.userReducer.username,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Hello, {username}!</Text>
      <ProfileForm
        username={username}
        setUsername={() => {
          console.log('Set username');
        }}
        password={''}
        setPassword={() => {
          console.log('Set password');
        }}
      />
      <ButtonGroup>
        <MainButton
          title="Update"
          onPress={() => {
            console.log('Update user info');
            navigation.navigate('Main');
          }}
        />
        <MainButton
          title="Log out"
          onPress={() => {
            console.log('Log out user');
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
  loginText: {
    color: 'gray',
    fontSize: TEXT_MEDIUM,
  },
  title: {
    fontSize: TEXT_HUGE,
    fontFamily: 'Pacifico-Regular',
    marginTop: 100,
    color: WHITE,
  },
  subtitle: {
    fontSize: TEXT_LARGE,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    color: 'gray',
  },
});

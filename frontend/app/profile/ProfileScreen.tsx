import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainTabs';
import {TEXT_HUGE, TEXT_LARGE, TEXT_MEDIUM} from '../sizing';
import {PRIMARY_BLUE, WHITE} from '../colors';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../authSlice';
import {RootState} from '../store';
import ProfileForm from './ProfileForm';
import ButtonGroup from '../shared/ButtonGroup';
import MainButton from '../shared/MainButton';

type StartScreenProps = BottomTabScreenProps<MainTabsParamList, 'Home'>;

export default function ProfileScreen({navigation}: StartScreenProps) {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.user.username);

  const handleLogout = async () => {
    await dispatch(logout());
    navigation.navigate('Start');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Hello, {username}!</Text>
      <ProfileForm
        username={username}
        setUsername={() => {}}
        password={''}
        setPassword={() => {}}
      />
      <ButtonGroup>
        <MainButton title="Update" />
        <MainButton title="Log out" onPress={handleLogout} />
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

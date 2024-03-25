import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainTabs';
import {TEXT_HUGE, TEXT_LARGE, TEXT_MEDIUM} from '../sizing';
import {PRIMARY_BLUE, WHITE} from '../colors';
import ProfileForm from './ProfileForm';
import {useGetUserQuery} from '../login/api';

type StartScreenProps = BottomTabScreenProps<MainTabsParamList, 'Profile'>;

export default function ProfileScreen({}: StartScreenProps) {
  const {data: user, isFetching} = useGetUserQuery();

  if (isFetching || !user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ProfileForm user={user} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_BLUE,
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

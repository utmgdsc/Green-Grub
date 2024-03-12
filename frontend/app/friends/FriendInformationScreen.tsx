import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Friend} from './api';
import {TEXT_LARGE} from '../sizing';
import Card from '../Card';
import MainButton from '../shared/MainButton';

export function FriendInformation({friend}: {friend: Friend}) {
  return (
    <Card>
      <Text style={styles.friendInformationText}>{friend.username}</Text>
      <MainButton title="Unfriend" />
    </Card>
  );
}

const styles = StyleSheet.create({
  friendInformationText: {
    fontSize: TEXT_LARGE,
    textAlign: 'center',
    color: 'black',
  },
});

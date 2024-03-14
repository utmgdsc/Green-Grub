import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Friend} from './api';
import {TEXT_LARGE} from '../sizing';
import Card from '../Card';

type FriendInformationProps = PropsWithChildren<{
  friend: Friend;
}>;

export function FriendInformation({friend, children}: FriendInformationProps) {
  return (
    <Card>
      <View style={styles.friendInfo}>
        <Text style={styles.friendInformationText}>{friend.username}</Text>
        {children}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  friendInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  friendInformationText: {
    fontSize: TEXT_LARGE,
    textAlign: 'center',
    color: 'black',
  },
});
